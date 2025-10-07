import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockGroups = [
  {
    id: 1,
    name: 'React Developers Hub',
    members: 1247,
    description: 'A community for React enthusiasts to share knowledge, projects, and best practices.',
    category: 'Frontend',
    isActive: true,
    lastActivity: '2 minutes ago'
  },
  {
    id: 2,
    name: 'JavaScript Masters',
    members: 2156,
    description: 'Advanced JavaScript discussions, ES6+ features, and modern development techniques.',
    category: 'Programming',
    isActive: true,
    lastActivity: '5 minutes ago'
  },
  {
    id: 3,
    name: 'Data Science Explorers',
    members: 892,
    description: 'Analyzing data, machine learning projects, and Python data science libraries.',
    category: 'Data Science',
    isActive: false,
    lastActivity: '1 hour ago'
  },
  {
    id: 4,
    name: 'UI/UX Design Circle',
    members: 1543,
    description: 'Design critique, portfolio reviews, and latest design trends discussion.',
    category: 'Design',
    isActive: true,
    lastActivity: '10 minutes ago'
  },
  {
    id: 5,
    name: 'DevOps Engineers',
    members: 687,
    description: 'Infrastructure, deployment strategies, and cloud technologies discussion.',
    category: 'DevOps',
    isActive: false,
    lastActivity: '3 hours ago'
  },
  {
    id: 6,
    name: 'Career Advice & Networking',
    members: 3241,
    description: 'Job search tips, interview preparation, and professional networking.',
    category: 'Career',
    isActive: true,
    lastActivity: '1 minute ago'
  }
];

const recentDiscussions = [
  {
    id: 1,
    title: 'Best practices for React component optimization',
    author: 'Sarah M.',
    group: 'React Developers Hub',
    replies: 24,
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'How to prepare for a senior developer interview?',
    author: 'Mike K.',
    group: 'Career Advice & Networking',
    replies: 156,
    time: '4 hours ago'
  },
  {
    id: 3,
    title: 'Machine Learning project showcase',
    author: 'Dr. Chen',
    group: 'Data Science Explorers',
    replies: 89,
    time: '6 hours ago'
  }
];

const Community = () => {
  const navigate = useNavigate();
  const [joinedGroups, setJoinedGroups] = useState(new Set());
  const [joiningGroup, setJoiningGroup] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    
    // Load joined groups from localStorage
    const savedJoinedGroups = localStorage.getItem('joinedGroups');
    if (savedJoinedGroups) {
      setJoinedGroups(new Set(JSON.parse(savedJoinedGroups)));
    }
  }, [navigate]);

  const handleJoinGroup = async (groupId, groupName) => {
    if (joinedGroups.has(groupId)) {
      // Leave group
      const newJoinedGroups = new Set(joinedGroups);
      newJoinedGroups.delete(groupId);
      setJoinedGroups(newJoinedGroups);
      localStorage.setItem('joinedGroups', JSON.stringify([...newJoinedGroups]));
      
      showNotification(`Left "${groupName}"`, 'info');
    } else {
      // Join group
      setJoiningGroup(groupId);
      
      // Simulate API call delay
      setTimeout(() => {
        const newJoinedGroups = new Set(joinedGroups);
        newJoinedGroups.add(groupId);
        setJoinedGroups(newJoinedGroups);
        localStorage.setItem('joinedGroups', JSON.stringify([...newJoinedGroups]));
        
        setJoiningGroup(null);
        showNotification(`Successfully joined "${groupName}"!`, 'success');
      }, 1000);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (!localStorage.getItem('token')) {
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
            boxShadow: 'var(--shadow-lg)',
            backgroundColor: notification.type === 'success' ? 'var(--secondary-green)' : 'var(--primary-blue)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            animation: 'slideInRight 0.3s ease-out'
          }}>
            <span style={{ fontSize: '1.2rem' }}>
              {notification.type === 'success' ? '✅' : 'ℹ️'}
            </span>
            {notification.message}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-5 fade-in">
          <h1>Learning Community</h1>
          <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Connect with fellow learners, share knowledge, and grow together in our 
            vibrant community of passionate developers and designers.
          </p>
          
          {/* Joined Groups Summary */}
          {joinedGroups.size > 0 && (
            <div style={{
              marginTop: 'var(--spacing-lg)',
              padding: 'var(--spacing-md)',
              backgroundColor: 'var(--primary-blue-ultra-light)',
              borderRadius: 'var(--radius-md)',
              display: 'inline-block'
            }}>
              🎉 You're a member of <strong>{joinedGroups.size}</strong> group{joinedGroups.size !== 1 ? 's' : ''}!
            </div>
          )}
        </div>

        {/* Community Stats */}
        <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 'var(--spacing-3xl)' }}>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>50k+</div>
            <div style={{ color: 'var(--gray-600)' }}>Active Members</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-green)' }}>{mockGroups.length}</div>
            <div style={{ color: 'var(--gray-600)' }}>Study Groups</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-purple)' }}>{joinedGroups.size}</div>
            <div style={{ color: 'var(--gray-600)' }}>Your Groups</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-orange)' }}>24/7</div>
            <div style={{ color: 'var(--gray-600)' }}>Support</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-2xl)' }}>
          {/* Groups Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <h2>Study Groups</h2>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => showNotification('Group creation feature coming soon! You\'ll be able to create and manage your own study groups.', 'info')}
              >
                + Create New Group
              </button>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              {mockGroups.map((group, index) => {
                const isJoined = joinedGroups.has(group.id);
                const isJoining = joiningGroup === group.id;
                
                return (
                  <div 
                    key={group.id} 
                    className="card slide-up" 
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      border: isJoined ? '2px solid var(--secondary-green)' : undefined,
                      backgroundColor: isJoined ? 'var(--primary-blue-ultra-light)' : undefined
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
                          <h3 style={{ margin: 0, fontSize: '1.125rem' }}>
                            {isJoined && '✅ '}{group.name}
                          </h3>
                          {group.isActive && (
                            <span style={{ 
                              width: '8px', 
                              height: '8px', 
                              backgroundColor: 'var(--secondary-green)', 
                              borderRadius: '50%' 
                            }}></span>
                          )}
                        </div>
                        
                        <p style={{ margin: '0 0 var(--spacing-md) 0', color: 'var(--gray-600)' }}>
                          {group.description}
                        </p>
                        
                        <div style={{ display: 'flex', gap: 'var(--spacing-lg)', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                          <span>👥 {(group.members + (isJoined ? 1 : 0)).toLocaleString()} members</span>
                          <span>🕒 {group.lastActivity}</span>
                        </div>
                        
                        {isJoined && (
                          <div style={{ 
                            marginTop: 'var(--spacing-sm)',
                            fontSize: '0.875rem',
                            color: 'var(--secondary-green)',
                            fontWeight: '500'
                          }}>
                            🎉 You're a member of this group!
                          </div>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--spacing-sm)' }}>
                        <span className="badge badge-info">{group.category}</span>
                        {isJoined && (
                          <span className="badge badge-success">Joined</span>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      className={`btn ${isJoined ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                      onClick={() => handleJoinGroup(group.id, group.name)}
                      disabled={isJoining}
                      style={{ 
                        width: '100%',
                        position: 'relative'
                      }}
                    >
                      {isJoining ? (
                        <>
                          <span style={{ opacity: 0.7 }}>Joining...</span>
                          <div style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '16px',
                            height: '16px',
                            border: '2px solid currentColor',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }}></div>
                        </>
                      ) : isJoined ? (
                        '✅ Leave Group'
                      ) : (
                        '➕ Join Group'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Recent Discussions */}
            <div className="card">
              <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>🔥 Trending Discussions</h3>
              {recentDiscussions.map(discussion => (
                <div key={discussion.id} style={{ 
                  padding: 'var(--spacing-md) 0',
                  borderBottom: '1px solid var(--gray-200)'
                }}>
                  <h4 style={{ 
                    fontSize: '0.95rem', 
                    margin: '0 0 var(--spacing-sm) 0',
                    color: 'var(--primary-blue)',
                    cursor: 'pointer'
                  }}>
                    {discussion.title}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                    by {discussion.author} in {discussion.group}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: 'var(--spacing-xs)' }}>
                    💬 {discussion.replies} replies • {discussion.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
              <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => showNotification('Discussion started! You can now share your thoughts with the community.', 'success')}
                >
                  📝 Start Discussion
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => showNotification('Project sharing feature coming soon! Showcase your work to the community.', 'info')}
                >
                  📢 Share Project
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => showNotification('Question posted! Community members will help you soon.', 'success')}
                >
                  ❓ Ask Question
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => showNotification('Study buddy matching initiated! You\'ll be connected with compatible learners.', 'success')}
                >
                  🎯 Find Study Buddy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;