import React, { useState } from 'react';
import { Heart, Calendar, CheckCircle, Video } from 'lucide-react';

function BreastSelfExamReminder() {
  const [lastExam, setLastExam] = useState('');
  const [findings, setFindings] = useState('');
  const [examHistory, setExamHistory] = useState([]);

  const handleLogExam = () => {
    if (!lastExam) {
      alert('Please select exam date');
      return;
    }

    const newExam = {
      date: lastExam,
      findings: findings || 'No abnormalities detected',
      timestamp: new Date().toISOString()
    };

    setExamHistory([newExam, ...examHistory]);
    setLastExam('');
    setFindings('');
    alert('Breast self-exam logged successfully!');
  };

  const getNextExamDate = () => {
    if (examHistory.length === 0) return 'Schedule your first exam';
    const last = new Date(examHistory[0].date);
    const next = new Date(last);
    next.setMonth(last.getMonth() + 1);
    return next.toLocaleDateString();
  };

  return (
    <div className="breast-exam-reminder">
      <div className="exam-header">
        <Heart size={24} />
        <h3>Breast Self-Exam Reminder</h3>
      </div>

      <div className="exam-importance">
        <p>🎗️ Monthly breast self-exams can help detect changes early</p>
        <p><strong>Best time:</strong> 3-5 days after your period ends</p>
      </div>

      <div className="next-exam-card">
        <Calendar size={20} />
        <div>
          <strong>Next Exam Due:</strong>
          <p>{getNextExamDate()}</p>
        </div>
      </div>

      <div className="log-exam-section">
        <h4>Log Your Exam</h4>
        <div className="input-group">
          <label>Exam Date:</label>
          <input 
            type="date" 
            value={lastExam}
            onChange={(e) => setLastExam(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="input-group">
          <label>Findings (optional):</label>
          <textarea 
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            placeholder="Any lumps, changes, or concerns?"
            rows="3"
          />
        </div>

        <button className="log-btn" onClick={handleLogExam}>
          <CheckCircle size={18} />
          Log Exam
        </button>
      </div>

      <div className="video-tutorial">
        <Video size={20} />
        <div>
          <strong>How to Perform Self-Exam</strong>
          <p>Watch tutorial video (Coming soon)</p>
        </div>
      </div>

      {examHistory.length > 0 && (
        <div className="exam-history">
          <h4>Exam History</h4>
          {examHistory.map((exam, index) => (
            <div key={index} className="history-item">
              <div className="history-date">{new Date(exam.date).toLocaleDateString()}</div>
              <div className="history-findings">{exam.findings}</div>
            </div>
          ))}
        </div>
      )}

      <div className="exam-tips">
        <h4>💡 Self-Exam Tips:</h4>
        <ul>
          <li>Examine in front of a mirror</li>
          <li>Check while lying down</li>
          <li>Use circular motions</li>
          <li>Check entire breast and armpit area</li>
          <li>Report any changes to your doctor</li>
        </ul>
      </div>

      <style jsx>{`
        .breast-exam-reminder {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 20px 0;
        }

        .exam-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          color: #e91e63;
        }

        .exam-importance {
          background: #fce4ec;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #e91e63;
        }

        .exam-importance p {
          margin: 4px 0;
          color: #333;
        }

        .next-exam-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, #fff5f5, #ffe0e0);
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .next-exam-card strong {
          display: block;
          color: #333;
        }

        .next-exam-card p {
          margin: 4px 0 0 0;
          color: #e91e63;
          font-weight: 600;
        }

        .log-exam-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .log-exam-section h4 {
          margin: 0 0 16px 0;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .input-group input, .input-group textarea {
          width: 100%;
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }

        .log-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #e91e63;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .log-btn:hover {
          background: #c2185b;
          transform: translateY(-2px);
        }

        .video-tutorial {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #e3f2fd;
          border-radius: 8px;
          margin-bottom: 20px;
          color: #1976d2;
        }

        .exam-history {
          margin-bottom: 20px;
        }

        .exam-history h4 {
          margin: 0 0 12px 0;
        }

        .history-item {
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .history-date {
          font-weight: 600;
          color: #e91e63;
          margin-bottom: 4px;
        }

        .history-findings {
          color: #666;
          font-size: 14px;
        }

        .exam-tips {
          background: #fff5f5;
          padding: 16px;
          border-radius: 8px;
        }

        .exam-tips h4 {
          margin: 0 0 12px 0;
        }

        .exam-tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .exam-tips li {
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
          color: #666;
        }

        .exam-tips li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #e91e63;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default BreastSelfExamReminder;
