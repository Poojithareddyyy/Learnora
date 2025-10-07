import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 15847,
    activeCourses: 52,
    completionRate: 89,
    revenue: 84250
  });

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const dashboardStats = [
    { label: 'Total Students', value: dashboardData.totalStudents.toLocaleString(), change: '+12%', icon: '👥', color: 'var(--primary-blue)' },
    { label: 'Active Courses', value: dashboardData.activeCourses.toString(), change: '+3', icon: '📚', color: 'var(--secondary-green)' },
    { label: 'Completion Rate', value: `${dashboardData.completionRate}%`, change: '+5%', icon: '🏆', color: 'var(--secondary-purple)' },
    { label: 'Revenue', value: `$${dashboardData.revenue.toLocaleString()}`, change: '+18%', icon: '💰', color: 'var(--secondary-orange)' }
  ];

  const recentActivities = [
    { id: 1, action: 'New course "Advanced React" published', time: '2 hours ago', type: 'course' },
    { id: 2, action: 'User Sarah Johnson completed JavaScript Fundamentals', time: '4 hours ago', type: 'completion' },
    { id: 3, action: 'Live session "Node.js Performance" scheduled', time: '6 hours ago', type: 'session' },
    { id: 4, action: 'New instructor Mike Chen added to platform', time: '1 day ago', type: 'user' },
    { id: 5, action: 'Course "Python Data Science" updated', time: '2 days ago', type: 'course' }
  ];

  const topCourses = [
    { id: 1, title: 'React Fundamentals', students: 2847, rating: 4.9, revenue: '$15,230' },
    { id: 2, title: 'JavaScript ES6+', students: 1956, rating: 4.8, revenue: '$12,890' },
    { id: 3, title: 'Python Data Science', students: 1543, rating: 4.7, revenue: '$10,670' },
    { id: 4, title: 'UI/UX Design', students: 1398, rating: 4.8, revenue: '$9,240' }
  ];

  // Helper Functions
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleQuickAction = async (action) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      switch (action) {
        case 'create-course':
          setActiveModal('createCourse');
          break;
        case 'schedule-session':
          showNotification('Session scheduling feature coming soon!', 'info');
          break;
        case 'manage-users':
          setActiveModal('manageUsers');
          break;
        case 'view-analytics':
          setActiveModal('analytics');
          break;
        case 'community-moderation':
          setActiveModal('moderation');
          break;
        case 'platform-settings':
          setActiveModal('settings');
          break;
        default:
          showNotification('Feature coming soon!', 'info');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleCourseAction = (action, courseId, courseName) => {
    switch (action) {
      case 'edit':
        setActiveModal('editCourse');
        showNotification(`Opening editor for "${courseName}"`, 'info');
        break;
      case 'view-all':
        setActiveModal('allCourses');
        break;
      default:
        showNotification('Action completed!', 'success');
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  if (localStorage.getItem('role') !== 'admin') {
    return null;
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Notification */}
        {notification && (
          <div style={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            zIndex: 1001,
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xl)',
            backgroundColor: notification.type === 'success' ? 'var(--secondary-green)' : 
                            notification.type === 'error' ? 'var(--error)' : 'var(--primary-blue)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            animation: 'slideInRight 0.3s ease-out',
            maxWidth: '350px'
          }}>
            <span style={{ fontSize: '1.2rem' }}>
              {notification.type === 'success' ? '✅' : 
               notification.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            {notification.message}
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: 'var(--spacing-xl)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '3px solid var(--primary-blue)',
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Processing...
            </div>
          </div>
        )}

        {/* Header */}
        <div className="fade-in" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <h1>Admin Dashboard</h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)' }}>
            Welcome back! Here's what's happening with your learning platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="feature-grid" style={{ marginBottom: 'var(--spacing-3xl)' }}>
          {dashboardStats.map((stat, index) => (
            <div key={stat.label} className="card slide-up" style={{ 
              animationDelay: `${index * 0.1}s`,
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: 'var(--spacing-md)'
              }}>
                {stat.icon}
              </div>
              <h3 style={{ 
                fontSize: '2rem', 
                margin: '0 0 var(--spacing-sm) 0',
                color: stat.color
              }}>
                {stat.value}
              </h3>
              <p style={{ 
                margin: '0 0 var(--spacing-sm) 0',
                color: 'var(--gray-600)'
              }}>
                {stat.label}
              </p>
              <span className="badge badge-success">
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-2xl)' }}>
          {/* Left Column */}
          <div>
            {/* Quick Actions */}
            <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
              <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Quick Actions</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleQuickAction('create-course')}
                  disabled={isLoading}
                >
                  📝 Create New Course
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleQuickAction('schedule-session')}
                  disabled={isLoading}
                >
                  🎥 Schedule Live Session
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleQuickAction('manage-users')}
                  disabled={isLoading}
                >
                  👥 Manage Users
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleQuickAction('view-analytics')}
                  disabled={isLoading}
                >
                  📊 View Analytics
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleQuickAction('community-moderation')}
                  disabled={isLoading}
                >
                  💬 Community Moderation
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleQuickAction('platform-settings')}
                  disabled={isLoading}
                >
                  ⚙️ Platform Settings
                </button>
              </div>
            </div>

            {/* Top Performing Courses */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h2>Top Performing Courses</h2>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleCourseAction('view-all')}
                >
                  View All
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                {topCourses.map((course, index) => (
                  <div key={course.id} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr auto auto auto auto',
                    alignItems: 'center',
                    padding: 'var(--spacing-md)',
                    backgroundColor: 'var(--gray-50)',
                    borderRadius: 'var(--radius-md)',
                    gap: 'var(--spacing-md)'
                  }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>{course.title}</h4>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{course.students}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Students</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>⭐ {course.rating}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Rating</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--secondary-green)' }}>{course.revenue}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Revenue</div>
                    </div>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleCourseAction('edit', course.id, course.title)}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activities */}
          <div>
            <div className="card" style={{ position: 'sticky', top: '100px' }}>
              <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Activities</h3>
              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                {recentActivities.map(activity => (
                  <div key={activity.id} style={{ 
                    padding: 'var(--spacing-sm)',
                    borderLeft: `3px solid var(--primary-blue)`,
                    paddingLeft: 'var(--spacing-md)'
                  }}>
                    <p style={{ 
                      margin: '0 0 var(--spacing-xs) 0',
                      fontSize: '0.9rem',
                      color: 'var(--gray-800)'
                    }}>
                      {activity.action}
                    </p>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--gray-500)'
                    }}>
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ width: '100%', marginTop: 'var(--spacing-lg)' }}
                onClick={() => setActiveModal('allActivities')}
              >
                View All Activities
              </button>
            </div>

            {/* System Status */}
            <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
              <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>System Status</h3>
              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Server Status</span>
                  <span className="badge badge-success">Online</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Database</span>
                  <span className="badge badge-success">Healthy</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>CDN</span>
                  <span className="badge badge-success">Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Backup</span>
                  <span className="badge badge-warning">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {activeModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1002,
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-xl)',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              animation: 'slideUp 0.3s ease-out'
            }}>
              {/* Modal Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 'var(--spacing-lg)',
                borderBottom: '1px solid var(--gray-200)',
                paddingBottom: 'var(--spacing-md)'
              }}>
                <h2 style={{ margin: 0 }}>
                  {activeModal === 'createCourse' && '📝 Create New Course'}
                  {activeModal === 'manageUsers' && '👥 Manage Users'}
                  {activeModal === 'analytics' && '📊 Analytics Dashboard'}
                  {activeModal === 'moderation' && '💬 Community Moderation'}
                  {activeModal === 'settings' && '⚙️ Platform Settings'}
                  {activeModal === 'editCourse' && '✏️ Edit Course'}
                  {activeModal === 'allCourses' && '📚 All Courses'}
                  {activeModal === 'allActivities' && '📋 All Activities'}
                </h2>
                <button 
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'var(--gray-500)'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div>
                {activeModal === 'createCourse' && (
                  <div>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      showNotification('Course created successfully!', 'success');
                      setDashboardData(prev => ({...prev, activeCourses: prev.activeCourses + 1}));
                      closeModal();
                    }}>
                      <div className="form-group">
                        <label className="form-label">Course Title</label>
                        <input className="form-input" type="text" placeholder="Enter course title" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea className="form-input" rows="4" placeholder="Course description" required></textarea>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <select className="form-input" required>
                            <option value="">Select category</option>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="data-science">Data Science</option>
                            <option value="design">Design</option>
                            <option value="devops">DevOps</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Level</label>
                          <select className="form-input" required>
                            <option value="">Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Create Course
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeModal === 'manageUsers' && (
                  <div>
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                      <input 
                        className="form-input" 
                        placeholder="Search users..." 
                        style={{ marginBottom: 'var(--spacing-md)' }}
                      />
                      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <button className="btn btn-secondary btn-sm">All Users</button>
                        <button className="btn btn-secondary btn-sm">Active</button>
                        <button className="btn btn-secondary btn-sm">Inactive</button>
                        <button className="btn btn-secondary btn-sm">Admins</button>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                      {[
                        { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Student', status: 'Active' },
                        { name: 'Mike Chen', email: 'mike@example.com', role: 'Instructor', status: 'Active' },
                        { name: 'Emily Davis', email: 'emily@example.com', role: 'Student', status: 'Inactive' }
                      ].map((user, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: 'var(--spacing-md)',
                          backgroundColor: 'var(--gray-50)',
                          borderRadius: 'var(--radius-md)'
                        }}>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{user.email}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <span className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                              {user.status}
                            </span>
                            <button className="btn btn-secondary btn-sm">Edit</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModal === 'analytics' && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>
                          {dashboardData.totalStudents.toLocaleString()}
                        </div>
                        <div>Total Students</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-green)' }}>
                          ${dashboardData.revenue.toLocaleString()}
                        </div>
                        <div>Total Revenue</div>
                      </div>
                    </div>
                    
                    <div style={{ backgroundColor: 'var(--gray-50)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                      <h3>📈 Detailed Analytics</h3>
                      <p>Advanced analytics dashboard with charts and detailed reports coming soon!</p>
                      <button className="btn btn-primary" onClick={() => showNotification('Analytics feature coming soon!', 'info')}>
                        Generate Report
                      </button>
                    </div>
                  </div>
                )}

                {activeModal === 'moderation' && (
                  <div>
                    <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                      <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>Reported Content</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Inappropriate comment in React Developers Hub</div>
                          </div>
                          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <button className="btn btn-success btn-sm" onClick={() => showNotification('Content approved', 'success')}>
                              Approve
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => showNotification('Content removed', 'success')}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>Spam Report</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Multiple spam posts detected in JavaScript Masters</div>
                          </div>
                          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <button className="btn btn-success btn-sm" onClick={() => showNotification('User warned', 'success')}>
                              Warn User
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => showNotification('User banned', 'success')}>
                              Ban User
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'settings' && (
                  <div>
                    <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                      <div>
                        <h3>Platform Configuration</h3>
                        <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>User Registration</span>
                            <button className="btn btn-success btn-sm">Enabled</button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Email Notifications</span>
                            <button className="btn btn-success btn-sm">Enabled</button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Maintenance Mode</span>
                            <button className="btn btn-secondary btn-sm">Disabled</button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3>System Actions</h3>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                          <button 
                            className="btn btn-secondary"
                            onClick={() => showNotification('System backup initiated', 'success')}
                          >
                            🔄 Backup System
                          </button>
                          <button 
                            className="btn btn-secondary"
                            onClick={() => showNotification('Cache cleared successfully', 'success')}
                          >
                            🗑️ Clear Cache
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(activeModal === 'editCourse' || activeModal === 'allCourses' || activeModal === 'allActivities') && (
                  <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
                      {activeModal === 'editCourse' && '✏️'}
                      {activeModal === 'allCourses' && '📚'}
                      {activeModal === 'allActivities' && '📋'}
                    </div>
                    <h3>Feature Coming Soon!</h3>
                    <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--spacing-lg)' }}>
                      This feature is currently under development and will be available in the next update.
                    </p>
                    <button className="btn btn-primary" onClick={closeModal}>
                      Got it
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;