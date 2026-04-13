import React, { useState, useEffect } from 'react';
import { Users, Heart, MessageCircle, TrendingUp, Share2 } from 'lucide-react';

function CommunitySupport() {
  const [activeTab, setActiveTab] = useState('stories');
  const [stories, setStories] = useState([]);
  const [myStory, setMyStory] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    const saved = localStorage.getItem('community_stories');
    if (saved) {
      setStories(JSON.parse(saved));
    } else {
      // Sample inspiring stories
      const sampleStories = [
        {
          id: 1,
          author: 'Sarah M.',
          story: 'Tracking my cycle helped me understand my body better. I discovered patterns I never noticed before and now I can plan my life around my energy levels!',
          likes: 24,
          category: 'Success Story',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          author: 'Priya K.',
          story: 'After 6 months of tracking, I was able to show my doctor clear patterns. It led to a proper PCOD diagnosis and treatment plan. Knowledge is power!',
          likes: 31,
          category: 'Health Journey',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 3,
          author: 'Emma L.',
          story: 'The symptom predictions helped me prepare for tough days. I schedule lighter workloads during my luteal phase and feel so much better!',
          likes: 18,
          category: 'Lifestyle',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setStories(sampleStories);
      localStorage.setItem('community_stories', JSON.stringify(sampleStories));
    }
  };

  const handleSubmitStory = (e) => {
    e.preventDefault();
    if (!myStory.trim()) return;

    const newStory = {
      id: Date.now(),
      author: 'You',
      story: myStory,
      likes: 0,
      category: 'My Story',
      date: new Date().toISOString()
    };

    const updated = [newStory, ...stories];
    setStories(updated);
    localStorage.setItem('community_stories', JSON.stringify(updated));
    setMyStory('');
    setShowForm(false);
  };

  const handleLike = (id) => {
    const updated = stories.map(s => 
      s.id === id ? { ...s, likes: s.likes + 1 } : s
    );
    setStories(updated);
    localStorage.setItem('community_stories', JSON.stringify(updated));
  };

  const tips = [
    { icon: '💪', title: 'Stay Active', text: 'Regular exercise can help reduce period pain and improve mood' },
    { icon: '🥗', title: 'Eat Well', text: 'Iron-rich foods and staying hydrated support menstrual health' },
    { icon: '😴', title: 'Rest Well', text: 'Quality sleep helps regulate hormones and reduces symptoms' },
    { icon: '🧘‍♀️', title: 'Manage Stress', text: 'Meditation and yoga can help balance hormones naturally' },
    { icon: '💊', title: 'Track Symptoms', text: 'Consistent tracking helps identify patterns and triggers' },
    { icon: '👩‍⚕️', title: 'Consult Doctors', text: 'Regular check-ups ensure early detection of issues' }
  ];

  const resources = [
    { title: 'Understanding PCOD', type: 'Article', time: '5 min read' },
    { title: 'Nutrition for Hormonal Health', type: 'Guide', time: '10 min read' },
    { title: 'Exercise During Your Cycle', type: 'Video', time: '8 min watch' },
    { title: 'Managing Period Pain', type: 'Article', time: '6 min read' },
    { title: 'Mental Health & Menstruation', type: 'Guide', time: '12 min read' }
  ];

  return (
    <div className="community-support-card">
      <div className="community-header">
        <div>
          <h3>
            <Users size={24} />
            Community Support
          </h3>
          <p className="community-subtitle">You're not alone in this journey</p>
        </div>
      </div>

      <div className="community-tabs">
        <button 
          className={`tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          <MessageCircle size={18} />
          Stories
        </button>
        <button 
          className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          <TrendingUp size={18} />
          Health Tips
        </button>
        <button 
          className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <Share2 size={18} />
          Resources
        </button>
      </div>

      {activeTab === 'stories' && (
        <div className="stories-section">
          <button 
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
            style={{ marginBottom: '20px' }}
          >
            {showForm ? 'Cancel' : 'Share Your Story'}
          </button>

          {showForm && (
            <form onSubmit={handleSubmitStory} className="story-form">
              <textarea
                value={myStory}
                onChange={(e) => setMyStory(e.target.value)}
                placeholder="Share your experience, success, or journey... Your story can inspire others!"
                rows="4"
                required
              />
              <button type="submit" className="btn-primary">
                Post Story
              </button>
            </form>
          )}

          <div className="stories-list">
            {stories.map(story => (
              <div key={story.id} className="story-card">
                <div className="story-header">
                  <div className="story-author">
                    <div className="author-avatar">
                      {story.author.charAt(0)}
                    </div>
                    <div>
                      <span className="author-name">{story.author}</span>
                      <span className="story-date">
                        {new Date(story.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  <span className="story-category">{story.category}</span>
                </div>
                <p className="story-text">{story.story}</p>
                <div className="story-actions">
                  <button 
                    className="like-btn"
                    onClick={() => handleLike(story.id)}
                  >
                    <Heart size={18} />
                    <span>{story.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="tips-grid">
          {tips.map((tip, idx) => (
            <div key={idx} className="tip-card">
              <div className="tip-icon">{tip.icon}</div>
              <h4>{tip.title}</h4>
              <p>{tip.text}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="resources-list">
          {resources.map((resource, idx) => (
            <div key={idx} className="resource-item">
              <div className="resource-info">
                <h4>{resource.title}</h4>
                <div className="resource-meta">
                  <span className="resource-type">{resource.type}</span>
                  <span className="resource-time">{resource.time}</span>
                </div>
              </div>
              <button className="btn-secondary">View</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommunitySupport;
