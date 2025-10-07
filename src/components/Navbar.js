import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-brand">
                    📚 Learnora
                </Link>
                
                <ul className="navbar-nav">
                    <li><Link to="/" className="navbar-link">Home</Link></li>
                    {token && <li><Link to="/tutorials" className="navbar-link">Tutorials</Link></li>}
                    {token && <li><Link to="/community" className="navbar-link">Community</Link></li>}
                    {role === 'admin' && <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>}
                </ul>

                <div className="navbar-actions">
                    {!token ? (
                        <>
                            <Link to="/register" className="btn btn-secondary btn-sm">Sign Up</Link>
                            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
