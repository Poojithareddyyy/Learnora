import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (email === 'learner@example.com' && password === 'pass') {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('role', 'learner');
        navigate('/tutorials');
      } else if (email === 'admin@example.com' && password === 'pass') {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('role', 'admin');
        navigate('/dashboard');
      } else {
        alert('Invalid credentials. Try: learner@example.com / admin@example.com with password: pass');
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
              <h2 className="card-title">Welcome Back</h2>
              <p className="card-description">
                Sign in to continue your learning journey
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email" 
                  required 
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password" 
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
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="text-center">
              <p style={{ marginBottom: 'var(--spacing-md)' }}>
                Don't have an account? 
                <Link 
                  to="/register" 
                  style={{ 
                    color: 'var(--primary-blue)', 
                    textDecoration: 'none',
                    marginLeft: 'var(--spacing-sm)'
                  }}
                >
                  Sign up here
                </Link>
              </p>
              
              <div style={{ 
                padding: 'var(--spacing-md)', 
                backgroundColor: 'var(--gray-100)', 
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}>
                <strong>Demo Credentials:</strong><br/>
                Learner: learner@example.com / pass<br/>
                Admin: admin@example.com / pass
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;