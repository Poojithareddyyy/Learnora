import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call delay
    setTimeout(() => {
      if (formData.email && formData.password && formData.name) {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('role', 'learner');
        navigate('/tutorials');
      } else {
        alert('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div style={{ 
          maxWidth: '480px', 
          margin: '0 auto', 
          paddingTop: 'var(--spacing-3xl)'
        }}>
          <div className="card fade-in">
            <div className="card-header text-center">
              <h2 className="card-title">Join Learnora</h2>
              <p className="card-description">
                Create your account and start learning today
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Enter your full name" 
                  required 
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Enter your email" 
                  required 
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Create a password" 
                  required 
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Confirm your password" 
                  required 
                  className="form-input"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: 'var(--spacing-lg)' }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="text-center">
              <p>
                Already have an account? 
                <Link 
                  to="/login" 
                  style={{ 
                    color: 'var(--primary-blue)', 
                    textDecoration: 'none',
                    marginLeft: 'var(--spacing-sm)'
                  }}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
