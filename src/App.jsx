import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tutorials from "./pages/Tutorials";
import Community from "./pages/Community";
import "./styles/theme.css";

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.style.backgroundColor = "";
  }, []);

  const handleStartToday = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // If logged in, navigate to tutorials
      navigate('/tutorials');
    } else {
      // If not logged in, navigate to login page
      navigate('/login');
    }
  };

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text fade-in">
            <h1>Transform Your Learning Journey with Learnora</h1>
            <p>
              Discover the future of education with our comprehensive platform designed for 
              modern learners. Access curated tutorials, interactive content, and connect 
              with a vibrant community of learners worldwide.
            </p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button onClick={handleStartToday} className="btn btn-lg" style={{ backgroundColor: "white", color: "var(--primary-blue)" }}>
                🚀 Start Learning Today
              </button>
              <button onClick={() => navigate('/tutorials')} className="btn btn-secondary btn-lg">
                Explore Tutorials
              </button>
            </div>
            <div style={{ marginTop: "2rem", display: "flex", gap: "2rem", fontSize: "0.9rem", opacity: "0.9" }}>
              <div>📚 1000+ Tutorials</div>
              <div>👥 50k+ Students</div>
              <div>� 95% Success Rate</div>
            </div>
          </div>
          
          <div className="hero-image slide-up">
            <img
              src="/a.png"
              alt="Learnify Learning Platform"
              style={{ 
                maxWidth: "100%", 
                height: "auto", 
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-xl)"
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Choose Learnora?</h2>
            <p style={{ fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
              Our platform combines cutting-edge technology with proven educational methods 
              to deliver an unparalleled learning experience.
            </p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">📖</div>
              <h3>Curated Content</h3>
              <p>Access carefully selected tutorials and resources from industry experts and top educators.</p>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Learning</h3>
              <p>AI-powered recommendations to help you learn at your own pace and focus on your goals.</p>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">👥</div>
              <h3>Community Driven</h3>
              <p>Join study groups, participate in discussions, and learn from peers around the world.</p>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">🏆</div>
              <h3>Track Progress</h3>
              <p>Monitor your learning journey with detailed analytics and achievement badges.</p>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">💼</div>
              <h3>Career Ready</h3>
              <p>Learn skills that matter in today's job market with industry-relevant curriculum.</p>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">🔄</div>
              <h3>Always Updated</h3>
              <p>Stay current with regularly updated content reflecting the latest industry trends.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "60px" }}> {/* Add padding to account for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
