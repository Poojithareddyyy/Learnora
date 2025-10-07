
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialCard from '../components/TutorialCard';

const mockTutorials = [
  { 
    id: 1,
    title: 'React Fundamentals', 
    description: 'Master the basics of React including components, props, state, and hooks.',
    level: 'Beginner',
    duration: '4 hours',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    enrolled: 12500,
    category: 'Frontend'
  },
  { 
    id: 2,
    title: 'Advanced JavaScript ES6+', 
    description: 'Deep dive into modern JavaScript features, async programming, and design patterns.',
    level: 'Advanced',
    duration: '6 hours',
    instructor: 'Mike Chen',
    rating: 4.9,
    enrolled: 8200,
    category: 'Frontend'
  },
  { 
    id: 3,
    title: 'Node.js Backend Development', 
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
    level: 'Intermediate',
    duration: '8 hours',
    instructor: 'David Rodriguez',
    rating: 4.7,
    enrolled: 6300,
    category: 'Backend'
  },
  { 
    id: 4,
    title: 'UI/UX Design Principles', 
    description: 'Learn design thinking, user research, and creating intuitive user interfaces.',
    level: 'Beginner',
    duration: '5 hours',
    instructor: 'Emily Davis',
    rating: 4.6,
    enrolled: 9800,
    category: 'Design'
  },
  { 
    id: 5,
    title: 'Python Data Science', 
    description: 'Analyze data with pandas, NumPy, and create visualizations with matplotlib.',
    level: 'Intermediate',
    duration: '10 hours',
    instructor: 'Dr. Alex Kumar',
    rating: 4.8,
    enrolled: 15600,
    category: 'Data Science'
  },
  { 
    id: 6,
    title: 'DevOps with Docker & Kubernetes', 
    description: 'Container orchestration, CI/CD pipelines, and cloud deployment strategies.',
    level: 'Advanced',
    duration: '12 hours',
    instructor: 'James Wilson',
    rating: 4.7,
    enrolled: 4200,
    category: 'DevOps'
  },
  {
    id: 7,
    title: 'Vue.js Complete Guide',
    description: 'Build modern web applications with Vue.js framework and its ecosystem.',
    level: 'Intermediate',
    duration: '7 hours',
    instructor: 'Lisa Wang',
    rating: 4.5,
    enrolled: 5600,
    category: 'Frontend'
  },
  {
    id: 8,
    title: 'MongoDB Database Design',
    description: 'Master NoSQL database design, queries, and performance optimization.',
    level: 'Intermediate',
    duration: '6 hours',
    instructor: 'Carlos Martinez',
    rating: 4.6,
    enrolled: 3800,
    category: 'Backend'
  },
  {
    id: 9,
    title: 'Machine Learning with TensorFlow',
    description: 'Build and deploy machine learning models using TensorFlow and Keras.',
    level: 'Advanced',
    duration: '15 hours',
    instructor: 'Dr. Priya Sharma',
    rating: 4.9,
    enrolled: 7200,
    category: 'Data Science'
  },
  {
    id: 10,
    title: 'Figma for Designers',
    description: 'Master modern design tools and collaborative design workflows.',
    level: 'Beginner',
    duration: '4 hours',
    instructor: 'Tom Anderson',
    rating: 4.4,
    enrolled: 11200,
    category: 'Design'
  }
];

const Tutorials = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredTutorials, setFilteredTutorials] = useState(mockTutorials);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  // Filter tutorials based on selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredTutorials(mockTutorials);
    } else {
      const filtered = mockTutorials.filter(tutorial => tutorial.category === selectedCategory);
      setFilteredTutorials(filtered);
    }
  }, [selectedCategory]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const categories = ['All', 'Frontend', 'Backend', 'Data Science', 'Design', 'DevOps'];

  if (!localStorage.getItem('token')) {
    return null;
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5 fade-in">
          <h1>Curated Learning Paths</h1>
          <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Expertly crafted tutorials designed to take you from beginner to professional. 
            Learn at your own pace with hands-on projects and real-world applications.
          </p>
        </div>

        {/* Stats Section */}
        <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 'var(--spacing-3xl)' }}>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>
              {mockTutorials.length}
            </div>
            <div style={{ color: 'var(--gray-600)' }}>Expert Tutorials</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-green)' }}>15k+</div>
            <div style={{ color: 'var(--gray-600)' }}>Active Learners</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-purple)' }}>95%</div>
            <div style={{ color: 'var(--gray-600)' }}>Completion Rate</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-orange)' }}>4.8★</div>
            <div style={{ color: 'var(--gray-600)' }}>Average Rating</div>
          </div>
        </div>

        {/* Filter Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-lg)',
          flexWrap: 'wrap'
        }}>
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ 
                minWidth: '100px',
                transition: 'all 0.3s ease'
              }}
            >
              {category}
              {category !== 'All' && (
                <span style={{ 
                  marginLeft: 'var(--spacing-xs)', 
                  fontSize: '0.8rem',
                  opacity: 0.8 
                }}>
                  ({mockTutorials.filter(t => t.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)',
          color: 'var(--gray-600)'
        }}>
          {selectedCategory === 'All' 
            ? `Showing all ${filteredTutorials.length} tutorials`
            : `Showing ${filteredTutorials.length} ${selectedCategory} tutorial${filteredTutorials.length !== 1 ? 's' : ''}`
          }
        </div>

        {/* Tutorials Grid */}
        <div className="feature-grid">
          {filteredTutorials.length > 0 ? (
            filteredTutorials.map((tutorial, index) => (
              <TutorialCard key={tutorial.id} {...tutorial} index={index} />
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: 'var(--spacing-3xl)',
              color: 'var(--gray-500)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)' }}>📚</div>
              <h3>No tutorials found</h3>
              <p>Try selecting a different category or check back later for new content.</p>
              <button 
                onClick={() => handleCategoryFilter('All')}
                className="btn btn-primary"
                style={{ marginTop: 'var(--spacing-md)' }}
              >
                View All Tutorials
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;