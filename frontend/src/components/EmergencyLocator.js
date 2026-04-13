import React, { useState } from 'react';
import { MapPin, Navigation, Phone, ShoppingBag } from 'lucide-react';

function EmergencyLocator() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          alert('Unable to get location. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  const findNearby = (type) => {
    if (!location) {
      getLocation();
      return;
    }

    const searchQuery = type === 'pharmacy' ? 'pharmacy near me' : 'public restroom near me';
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}/@${location.lat},${location.lng},15z`;
    window.open(mapsUrl, '_blank');
  };

  const callEmergency = () => {
    if (window.confirm('Call emergency services?')) {
      window.location.href = 'tel:911';
    }
  };

  return (
    <div className="emergency-locator">
      <div className="emergency-header">
        <MapPin size={24} />
        <h3>Period Emergency Kit</h3>
      </div>

      <p className="emergency-description">
        Quick access to nearby pharmacies, restrooms, and emergency contacts
      </p>

      <div className="location-status">
        {location ? (
          <div className="location-found">
            <Navigation size={18} />
            <span>Location detected</span>
          </div>
        ) : (
          <button className="get-location-btn" onClick={getLocation} disabled={loading}>
            {loading ? 'Getting location...' : 'Enable Location'}
          </button>
        )}
      </div>

      <div className="emergency-actions">
        <button className="emergency-btn pharmacy" onClick={() => findNearby('pharmacy')}>
          <ShoppingBag size={24} />
          <span>Find Pharmacy</span>
          <small>Tampons, pads, pain relief</small>
        </button>

        <button className="emergency-btn restroom" onClick={() => findNearby('restroom')}>
          <MapPin size={24} />
          <span>Find Restroom</span>
          <small>Public facilities nearby</small>
        </button>

        <button className="emergency-btn sos" onClick={callEmergency}>
          <Phone size={24} />
          <span>Emergency Call</span>
          <small>Call 911</small>
        </button>
      </div>

      <div className="emergency-tips">
        <h4>💡 Emergency Tips:</h4>
        <ul>
          <li>Keep emergency supplies in your bag</li>
          <li>Know your nearest pharmacy locations</li>
          <li>Save emergency contacts in your phone</li>
          <li>Track your cycle to anticipate needs</li>
        </ul>
      </div>

      <div className="community-help">
        <h4>🤝 Community Help</h4>
        <p>Need supplies urgently? Request help from nearby Aura users (coming soon)</p>
        <button className="community-btn" disabled>
          Request Emergency Supplies
        </button>
      </div>

      <style jsx>{`
        .emergency-locator {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 20px 0;
        }

        .emergency-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          color: #ff6b6b;
        }

        .emergency-description {
          color: #666;
          margin-bottom: 20px;
        }

        .location-status {
          margin-bottom: 24px;
        }

        .location-found {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: #e8f5e9;
          border-radius: 8px;
          color: #2e7d32;
          font-weight: 500;
        }

        .get-location-btn {
          width: 100%;
          padding: 12px;
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .get-location-btn:hover:not(:disabled) {
          background: #ee5a6f;
        }

        .get-location-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .emergency-actions {
          display: grid;
          gap: 16px;
          margin-bottom: 24px;
        }

        .emergency-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px;
          border: 2px solid;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .emergency-btn span {
          font-size: 18px;
          font-weight: 600;
        }

        .emergency-btn small {
          font-size: 13px;
          color: #666;
        }

        .emergency-btn.pharmacy {
          border-color: #4caf50;
          color: #2e7d32;
        }

        .emergency-btn.pharmacy:hover {
          background: #e8f5e9;
          transform: translateY(-2px);
        }

        .emergency-btn.restroom {
          border-color: #2196f3;
          color: #1565c0;
        }

        .emergency-btn.restroom:hover {
          background: #e3f2fd;
          transform: translateY(-2px);
        }

        .emergency-btn.sos {
          border-color: #f44336;
          color: #c62828;
        }

        .emergency-btn.sos:hover {
          background: #ffebee;
          transform: translateY(-2px);
        }

        .emergency-tips {
          background: #fff5f5;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .emergency-tips h4 {
          margin: 0 0 12px 0;
          color: #333;
        }

        .emergency-tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .emergency-tips li {
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
          color: #666;
        }

        .emergency-tips li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #ff6b6b;
          font-weight: bold;
        }

        .community-help {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
        }

        .community-help h4 {
          margin: 0 0 8px 0;
          color: #333;
        }

        .community-help p {
          color: #666;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .community-btn {
          padding: 10px 20px;
          background: #ddd;
          color: #999;
          border: none;
          border-radius: 6px;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default EmergencyLocator;
