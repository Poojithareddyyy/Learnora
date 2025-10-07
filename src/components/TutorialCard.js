import React from 'react';

const TutorialCard = ({ 
  title, 
  description, 
  level = 'Beginner', 
  duration = '2 hours', 
  instructor = 'Expert Instructor',
  rating = 4.5,
  enrolled = 0,
  category = 'General',
  index = 0
}) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'var(--secondary-green)';
      case 'Intermediate': return 'var(--secondary-orange)';
      case 'Advanced': return 'var(--error)';
      default: return 'var(--gray-500)';
    }
  };

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'Beginner': return 'badge-success';
      case 'Intermediate': return 'badge-warning';
      case 'Advanced': return 'badge-warning';
      default: return 'badge-info';
    }
  };

  return (
    <div 
      className="card slide-up" 
      style={{ 
        animationDelay: `${index * 0.1}s`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: 'var(--spacing-sm)'
        }}>
          <span className={`badge ${getLevelBadgeClass(level)}`}>
            {level}
          </span>
          <span style={{ 
            fontSize: '0.875rem', 
            color: 'var(--gray-500)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)'
          }}>
            ⏱️ {duration}
          </span>
        </div>
        
        <h3 style={{ 
          fontSize: '1.25rem',
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--gray-900)'
        }}>
          {title}
        </h3>
        
        <p style={{ 
          color: 'var(--gray-600)', 
          fontSize: '0.95rem',
          lineHeight: '1.5'
        }}>
          {description}
        </p>
      </div>

      {/* Instructor & Rating */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 'var(--spacing-md)',
        fontSize: '0.875rem'
      }}>
        <div style={{ color: 'var(--gray-600)' }}>
          👨‍🏫 {instructor}
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--spacing-xs)'
        }}>
          <span style={{ color: 'var(--secondary-orange)' }}>⭐</span>
          <span style={{ color: 'var(--gray-600)' }}>{rating}</span>
        </div>
      </div>

      {/* Enrollment Stats */}
      <div style={{ 
        fontSize: '0.875rem', 
        color: 'var(--gray-500)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        📚 {enrolled.toLocaleString()} students enrolled
      </div>

      {/* Action Button */}
      <div style={{ marginTop: 'auto' }}>
        <button 
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={() => {
            // Simulate starting tutorial
            const startTutorial = () => {
              // Show loading state briefly
              const button = document.activeElement;
              const originalText = button.textContent;
              button.textContent = 'Starting...';
              button.disabled = true;
              
              setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                // In a real app, this would navigate to the tutorial content
                alert(`🚀 Welcome to "${title}"!\n\nThis tutorial will open in the learning environment.\n\n✨ Features:\n• Interactive lessons\n• Hands-on coding exercises\n• Progress tracking\n• Certificate upon completion`);
              }, 1000);
            };
            
            startTutorial();
          }}
        >
          Start Learning
        </button>
      </div>

      {/* Progress indicator (for demo) */}
      <div style={{ 
        marginTop: 'var(--spacing-md)', 
        padding: 'var(--spacing-sm)',
        backgroundColor: 'var(--gray-100)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem',
        color: 'var(--gray-600)',
        textAlign: 'center'
      }}>
        🎯 Interactive lessons • 📝 Hands-on projects • 🏆 Certificate included
      </div>
    </div>
  );
};

export default TutorialCard;