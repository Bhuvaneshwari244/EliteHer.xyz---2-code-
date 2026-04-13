import React, { useState, useEffect } from 'react';
import { Phone, Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';

function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const saved = localStorage.getItem('emergency_contacts');
    if (saved) {
      setContacts(JSON.parse(saved));
    } else {
      // Add default emergency numbers
      const defaults = [
        {
          id: 1,
          name: 'National Emergency',
          relationship: 'Emergency Services',
          phone: '112',
          email: '',
          isDefault: true
        },
        {
          id: 2,
          name: 'Women Helpline',
          relationship: 'Support Service',
          phone: '1091',
          email: '',
          isDefault: true
        }
      ];
      setContacts(defaults);
      localStorage.setItem('emergency_contacts', JSON.stringify(defaults));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      const updated = contacts.map(c => 
        c.id === editingId ? { ...formData, id: editingId } : c
      );
      setContacts(updated);
      localStorage.setItem('emergency_contacts', JSON.stringify(updated));
    } else {
      const newContact = {
        ...formData,
        id: Date.now(),
        isDefault: false
      };
      const updated = [...contacts, newContact];
      setContacts(updated);
      localStorage.setItem('emergency_contacts', JSON.stringify(updated));
    }

    resetForm();
  };

  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email || ''
    });
    setEditingId(contact.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('emergency_contacts', JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({ name: '', relationship: '', phone: '', email: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="emergency-contacts-card">
      <div className="emergency-header">
        <div>
          <h3>
            <Phone size={24} />
            Emergency Contacts
          </h3>
          <p className="emergency-subtitle">Quick access to important contacts</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          {showForm ? 'Cancel' : 'Add Contact'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Dr. Smith"
                required
              />
            </div>
            <div className="form-group">
              <label>Relationship *</label>
              <input
                type="text"
                value={formData.relationship}
                onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                placeholder="Gynecologist"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div className="form-group">
              <label>Email (Optional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="doctor@example.com"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? 'Update Contact' : 'Save Contact'}
            </button>
            <button type="button" onClick={resetForm} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="contacts-list">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <div className="contact-info">
              <div className="contact-avatar">
                {contact.name.charAt(0)}
              </div>
              <div className="contact-details">
                <h4>{contact.name}</h4>
                <p className="contact-relationship">{contact.relationship}</p>
                <p className="contact-phone">📞 {contact.phone}</p>
                {contact.email && (
                  <p className="contact-email">✉️ {contact.email}</p>
                )}
              </div>
            </div>
            <div className="contact-actions">
              <button 
                className="btn-call"
                onClick={() => handleCall(contact.phone)}
              >
                <Phone size={18} />
                Call
              </button>
              {!contact.isDefault && (
                <>
                  <button 
                    className="btn-icon"
                    onClick={() => handleEdit(contact)}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    className="btn-icon"
                    onClick={() => handleDelete(contact.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="emergency-info">
        <AlertCircle size={20} />
        <div>
          <h4>In Case of Emergency</h4>
          <p>If you're experiencing severe pain, heavy bleeding, or any concerning symptoms, please contact your healthcare provider or emergency services immediately.</p>
        </div>
      </div>
    </div>
  );
}

export default EmergencyContacts;
