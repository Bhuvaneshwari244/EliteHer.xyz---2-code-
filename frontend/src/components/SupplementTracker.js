import React, { useState } from 'react';
import { Pill, Plus, Trash2, Clock } from 'lucide-react';

function SupplementTracker() {
  const [supplements, setSupplements] = useState([
    { id: 1, name: 'Iron', dosage: '65mg', time: '09:00', taken: false },
    { id: 2, name: 'Vitamin D', dosage: '1000 IU', time: '09:00', taken: false },
    { id: 3, name: 'Folic Acid', dosage: '400mcg', time: '09:00', taken: false }
  ]);
  const [newSupplement, setNewSupplement] = useState({ name: '', dosage: '', time: '09:00' });

  const addSupplement = () => {
    if (!newSupplement.name || !newSupplement.dosage) {
      alert('Please enter supplement name and dosage');
      return;
    }

    const supplement = {
      id: Date.now(),
      ...newSupplement,
      taken: false
    };

    setSupplements([...supplements, supplement]);
    setNewSupplement({ name: '', dosage: '', time: '09:00' });
  };

  const toggleTaken = (id) => {
    setSupplements(supplements.map(s => 
      s.id === id ? { ...s, taken: !s.taken } : s
    ));
  };

  const deleteSupplement = (id) => {
    setSupplements(supplements.filter(s => s.id !== id));
  };

  const takenCount = supplements.filter(s => s.taken).length;
  const totalCount = supplements.length;

  return (
    <div className="supplement-tracker">
      <div className="supplement-header">
        <Pill size={24} />
        <h3>Supplement Tracker</h3>
      </div>

      <div className="progress-card">
        <div className="progress-info">
          <span>Today's Progress</span>
          <span className="progress-count">{takenCount}/{totalCount}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(takenCount/totalCount) * 100}%` }}
          />
        </div>
      </div>

      <div className="add-supplement">
        <h4>Add New Supplement</h4>
        <div className="add-form">
          <input 
            type="text"
            placeholder="Supplement name"
            value={newSupplement.name}
            onChange={(e) => setNewSupplement({...newSupplement, name: e.target.value})}
          />
          <input 
            type="text"
            placeholder="Dosage (e.g., 500mg)"
            value={newSupplement.dosage}
            onChange={(e) => setNewSupplement({...newSupplement, dosage: e.target.value})}
          />
          <input 
            type="time"
            value={newSupplement.time}
            onChange={(e) => setNewSupplement({...newSupplement, time: e.target.value})}
          />
          <button onClick={addSupplement}>
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      <div className="supplements-list">
        <h4>Your Supplements</h4>
        {supplements.map(supplement => (
          <div key={supplement.id} className={`supplement-item ${supplement.taken ? 'taken' : ''}`}>
            <div className="supplement-checkbox">
              <input 
                type="checkbox"
                checked={supplement.taken}
                onChange={() => toggleTaken(supplement.id)}
              />
            </div>
            <div className="supplement-info">
              <strong>{supplement.name}</strong>
              <span>{supplement.dosage}</span>
            </div>
            <div className="supplement-time">
              <Clock size={14} />
              {supplement.time}
            </div>
            <button 
              className="delete-btn"
              onClick={() => deleteSupplement(supplement.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="supplement-tips">
        <h4>💊 Supplement Tips:</h4>
        <ul>
          <li><strong>Iron:</strong> Best absorbed on empty stomach, avoid with calcium</li>
          <li><strong>Vitamin D:</strong> Take with fatty meal for better absorption</li>
          <li><strong>Folic Acid:</strong> Essential for women of childbearing age</li>
          <li><strong>B12:</strong> Important for energy and mood</li>
          <li><strong>Omega-3:</strong> Reduces inflammation and cramps</li>
        </ul>
      </div>

      <style jsx>{`
        .supplement-tracker {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 20px 0;
        }

        .supplement-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: #9c27b0;
        }

        .progress-card {
          background: linear-gradient(135deg, #f3e5f5, #e1bee7);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .progress-count {
          color: #9c27b0;
          font-size: 20px;
        }

        .progress-bar {
          height: 12px;
          background: white;
          border-radius: 6px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #9c27b0, #ba68c8);
          transition: width 0.3s ease;
        }

        .add-supplement {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .add-supplement h4 {
          margin: 0 0 16px 0;
        }

        .add-form {
          display: grid;
          gap: 12px;
        }

        .add-form input {
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }

        .add-form button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: #9c27b0;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-form button:hover {
          background: #7b1fa2;
        }

        .supplements-list h4 {
          margin: 0 0 16px 0;
        }

        .supplement-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 12px;
          transition: all 0.3s ease;
        }

        .supplement-item.taken {
          opacity: 0.6;
          background: #e8f5e9;
        }

        .supplement-checkbox input {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .supplement-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .supplement-info strong {
          color: #333;
        }

        .supplement-info span {
          color: #666;
          font-size: 14px;
        }

        .supplement-time {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #666;
          font-size: 14px;
        }

        .delete-btn {
          padding: 8px;
          background: transparent;
          border: none;
          color: #f44336;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .delete-btn:hover {
          background: #ffebee;
        }

        .supplement-tips {
          background: #fff5f5;
          padding: 16px;
          border-radius: 8px;
          margin-top: 24px;
        }

        .supplement-tips h4 {
          margin: 0 0 12px 0;
        }

        .supplement-tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .supplement-tips li {
          padding: 6px 0;
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export default SupplementTracker;
