import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Video, MessageCircle, Calendar, Phone, User, Clock, Star, Send, X, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';

function DoctorConsultation() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('doctors');
  const [appointments, setAppointments] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [bookingForm, setBookingForm] = useState({
    doctorId: '',
    date: '',
    time: '',
    type: 'video',
    reason: ''
  });

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Gynecologist',
      experience: '15 years',
      rating: 4.9,
      reviews: 234,
      availability: 'Available Today',
      consultationFee: '$50',
      languages: ['English', 'Spanish'],
      image: '👩‍⚕️',
      about: 'Specialized in reproductive health, PCOD/PCOS treatment, and menstrual disorders.'
    },
    {
      id: 2,
      name: 'Dr. Emily Chen',
      specialty: 'Reproductive Endocrinologist',
      experience: '12 years',
      rating: 4.8,
      reviews: 189,
      availability: 'Available Tomorrow',
      consultationFee: '$60',
      languages: ['English', 'Mandarin'],
      image: '👩‍⚕️',
      about: 'Expert in hormonal disorders, fertility issues, and PCOD management.'
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialty: 'Gynecologist & Obstetrician',
      experience: '18 years',
      rating: 4.9,
      reviews: 312,
      availability: 'Available Today',
      consultationFee: '$55',
      languages: ['English', 'Hindi'],
      image: '👩‍⚕️',
      about: 'Comprehensive women\'s health care, pregnancy, and menstrual health specialist.'
    },
    {
      id: 4,
      name: 'Dr. Maria Rodriguez',
      specialty: 'Adolescent Gynecologist',
      experience: '10 years',
      rating: 4.7,
      reviews: 156,
      availability: 'Available Today',
      consultationFee: '$45',
      languages: ['English', 'Spanish'],
      image: '👩‍⚕️',
      about: 'Specialized in adolescent reproductive health and menstrual disorders.'
    }
  ];

  useEffect(() => {
    loadAppointments();
    loadChatHistory();
  }, []);

  const loadAppointments = () => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  };

  const loadChatHistory = () => {
    const saved = localStorage.getItem('doctor_chats');
    if (saved) {
      setChatMessages(JSON.parse(saved));
    }
  };

  const saveAppointments = (newAppointments) => {
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
    setAppointments(newAppointments);
  };

  const saveChatMessages = (messages) => {
    localStorage.setItem('doctor_chats', JSON.stringify(messages));
    setChatMessages(messages);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingForm({ ...bookingForm, doctorId: doctor.id });
    setShowBookingForm(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      ...bookingForm,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };
    saveAppointments([...appointments, newAppointment]);
    setShowBookingForm(false);
    setBookingForm({ doctorId: '', date: '', time: '', type: 'video', reason: '' });
    alert('Appointment booked successfully!');
  };

  const handleJoinCall = (appointment) => {
    // Simulate joining a video call
    const callUrl = `https://meet.google.com/new`; // Or use any video conferencing service
    alert(`Joining video call with ${appointment.doctorName}...\n\nIn a real application, this would:\n1. Open a video call interface\n2. Connect you with the doctor\n3. Enable audio/video communication\n\nFor demo purposes, opening a new meeting link...`);
    window.open(callUrl, '_blank');
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      saveAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...chatMessages, newMessage];
    saveChatMessages(updatedMessages);
    setMessageInput('');

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse = {
        id: Date.now() + 1,
        text: 'Thank you for your message. A doctor will respond shortly. For urgent matters, please book a video consultation.',
        sender: 'doctor',
        timestamp: new Date().toISOString()
      };
      saveChatMessages([...updatedMessages, doctorResponse]);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return '#10b981';
      case 'completed': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="dashboard">
      <Navigation />
      <AnimatedBackground />
      
      <button onClick={() => navigate(-1)} className="back-button" title="Go back">
        <ArrowLeft size={20} />
      </button>
      
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <span className="logo-icon">👩‍⚕️</span>
            <div>
              <h1 className="logo-title">Doctor Consultation</h1>
              <p className="logo-subtitle">Connect with gynecology experts</p>
            </div>
          </div>
          <div className="header-actions">
            <LanguageSelector />
            <ThemeToggle />
            <div className="privacy-badge">
              <Shield size={16} />
              <span>Private & Secure</span>
            </div>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      <div className="page-container">
        {/* Tabs */}
        <div className="consultation-tabs">
          <button 
            className={`tab-btn ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            <User size={20} />
            Find Doctors
          </button>
          <button 
            className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <Calendar size={20} />
            My Appointments
          </button>
          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageCircle size={20} />
            Chat Support
          </button>
        </div>

        {/* Doctors List */}
        {activeTab === 'doctors' && (
          <div className="doctors-grid">
            {doctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-header">
                  <div className="doctor-avatar">{doctor.image}</div>
                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <div className="doctor-rating">
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                      <span>{doctor.rating}</span>
                      <span className="reviews">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="doctor-details">
                  <div className="detail-row">
                    <Clock size={16} />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="detail-row">
                    <span className="availability-badge">{doctor.availability}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Languages:</strong> {doctor.languages.join(', ')}
                  </div>
                  <p className="doctor-about">{doctor.about}</p>
                </div>

                <div className="doctor-footer">
                  <div className="consultation-fee">
                    <span className="fee-label">Consultation Fee</span>
                    <span className="fee-amount">{doctor.consultationFee}</span>
                  </div>
                  <div className="doctor-actions">
                    <button 
                      onClick={() => handleBookAppointment(doctor)}
                      className="btn-primary"
                    >
                      <Video size={18} />
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Appointments */}
        {activeTab === 'appointments' && (
          <div className="appointments-section">
            {appointments.length === 0 ? (
              <div className="empty-state">
                <Calendar size={48} color="#ccc" />
                <p>No appointments scheduled</p>
                <p className="empty-subtitle">Book a consultation with a doctor</p>
                <button 
                  onClick={() => setActiveTab('doctors')}
                  className="btn-primary"
                >
                  Find Doctors
                </button>
              </div>
            ) : (
              <div className="appointments-list">
                {appointments.map(appointment => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-header">
                      <div>
                        <h3>{appointment.doctorName}</h3>
                        <p className="appointment-specialty">{appointment.doctorSpecialty}</p>
                      </div>
                      <span 
                        className="status-badge"
                        style={{background: getStatusColor(appointment.status)}}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <div className="appointment-details">
                      <div className="detail-item">
                        <Calendar size={16} />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-item">
                        <Clock size={16} />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="detail-item">
                        {appointment.type === 'video' ? <Video size={16} /> : <Phone size={16} />}
                        <span>{appointment.type === 'video' ? 'Video Call' : 'Phone Call'}</span>
                      </div>
                    </div>

                    {appointment.reason && (
                      <div className="appointment-reason">
                        <strong>Reason:</strong> {appointment.reason}
                      </div>
                    )}

                    <div className="appointment-actions">
                      {appointment.status === 'scheduled' && (
                        <>
                          <button 
                            className="btn-primary"
                            onClick={() => handleJoinCall(appointment)}
                          >
                            <Video size={18} />
                            Join Call
                          </button>
                          <button 
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="btn-secondary"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat Support */}
        {activeTab === 'chat' && (
          <div className="chat-section">
            <div className="chat-container">
              <div className="chat-header">
                <MessageCircle size={20} />
                <h3>Chat with Medical Support</h3>
              </div>

              <div className="chat-messages">
                {chatMessages.length === 0 ? (
                  <div className="chat-empty">
                    <MessageCircle size={48} color="#ccc" />
                    <p>No messages yet</p>
                    <p className="empty-subtitle">Start a conversation with our medical support team</p>
                  </div>
                ) : (
                  chatMessages.map(message => (
                    <div 
                      key={message.id} 
                      className={`chat-message ${message.sender}`}
                    >
                      <div className="message-bubble">
                        <p>{message.text}</p>
                        <span className="message-time">
                          {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="chat-input"
                />
                <button type="submit" className="send-btn">
                  <Send size={20} />
                </button>
              </form>
            </div>

            <div className="chat-info">
              <h4>Quick Tips</h4>
              <ul>
                <li>Response time: Usually within 2-4 hours</li>
                <li>For urgent matters, book a video consultation</li>
                <li>Share your symptoms and concerns clearly</li>
                <li>Keep your medical history handy</li>
              </ul>
            </div>
          </div>
        )}

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="modal-overlay" onClick={() => setShowBookingForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Book Consultation</h3>
                <button onClick={() => setShowBookingForm(false)} className="close-btn">
                  <X size={24} />
                </button>
              </div>

              <div className="doctor-summary">
                <span className="doctor-avatar-small">{selectedDoctor.image}</span>
                <div>
                  <h4>{selectedDoctor.name}</h4>
                  <p>{selectedDoctor.specialty}</p>
                </div>
              </div>

              <form onSubmit={handleSubmitBooking} className="booking-form">
                <div className="form-group">
                  <label>Consultation Type *</label>
                  <select
                    value={bookingForm.type}
                    onChange={(e) => setBookingForm({...bookingForm, type: e.target.value})}
                    required
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Time *</label>
                    <input
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Reason for Consultation *</label>
                  <textarea
                    value={bookingForm.reason}
                    onChange={(e) => setBookingForm({...bookingForm, reason: e.target.value})}
                    placeholder="Describe your symptoms or concerns..."
                    rows="4"
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    Confirm Booking
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowBookingForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">🌸</span>
            <span className="footer-name">Aura</span>
          </div>
          <p className="footer-disclaimer">
            Consultations are for informational purposes. Always follow your doctor's advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default DoctorConsultation;
