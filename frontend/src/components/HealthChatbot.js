import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot } from 'lucide-react';

const HEALTH_RESPONSES = {
  'irregular': {
    keywords: ['irregular', 'inconsistent', 'varying', 'different lengths'],
    response: "Irregular cycles can be normal, especially during stress or lifestyle changes. However, if you notice patterns like cycles longer than 35 days or shorter than 21 days consistently, it's worth discussing with a healthcare provider. Track your cycles for 3-6 months to identify patterns."
  },
  'pcod': {
    keywords: ['pcod', 'pcos', 'polycystic'],
    response: "PCOD (Polycystic Ovary Disorder) is a hormonal condition affecting many women. Common signs include irregular periods, weight gain, acne, and excessive hair growth. Our risk assessment can help identify patterns, but only a healthcare professional can provide a proper diagnosis through blood tests and ultrasound."
  },
  'pain': {
    keywords: ['pain', 'cramps', 'hurt', 'ache'],
    response: "Menstrual cramps are common and usually manageable. Try: heat therapy (heating pad), gentle exercise, staying hydrated, and over-the-counter pain relievers. If pain is severe, interferes with daily activities, or worsens over time, consult a doctor as it could indicate conditions like endometriosis."
  },
  'heavy': {
    keywords: ['heavy', 'bleeding', 'flow', 'clots'],
    response: "Heavy menstrual bleeding (menorrhagia) means soaking through pads/tampons every 1-2 hours or passing large clots. This can lead to anemia. Causes include hormonal imbalances, fibroids, or thyroid issues. Track your flow intensity and consult a doctor if it's consistently heavy."
  },
  'mood': {
    keywords: ['mood', 'emotional', 'anxious', 'depressed', 'irritable'],
    response: "Hormonal fluctuations during your cycle can affect mood. This is normal to some extent (PMS). However, if mood changes are severe or interfere with daily life, you might have PMDD (Premenstrual Dysphoric Disorder). Lifestyle changes, stress management, and sometimes medication can help."
  },
  'diet': {
    keywords: ['diet', 'food', 'eat', 'nutrition'],
    response: "A balanced diet supports menstrual health: iron-rich foods (spinach, lentils) replenish blood loss, omega-3s reduce inflammation, complex carbs stabilize mood, and staying hydrated reduces bloating. Limit caffeine, salt, and sugar during your period."
  },
  'exercise': {
    keywords: ['exercise', 'workout', 'fitness', 'yoga'],
    response: "Exercise during your period is generally beneficial! Light to moderate activity like walking, yoga, or swimming can reduce cramps and improve mood. Listen to your body - rest when needed, especially on heavy flow days. Avoid intense workouts if you feel fatigued."
  },
  'pregnancy': {
    keywords: ['pregnant', 'pregnancy', 'conceive', 'fertility'],
    response: "Fertility is highest during ovulation (typically days 12-16 of your cycle). Track your cycles to identify patterns. If you're trying to conceive and haven't succeeded after 12 months (or 6 months if over 35), consult a fertility specialist. Regular cycles generally indicate regular ovulation."
  },
  'stress': {
    keywords: ['stress', 'anxiety', 'worried', 'tension'],
    response: "Stress can significantly impact your menstrual cycle, causing delays or irregularities. Practice stress management: deep breathing, meditation, adequate sleep, regular exercise, and maintaining social connections. If stress is overwhelming, consider speaking with a mental health professional."
  },
  'default': {
    keywords: [],
    response: "I'm here to provide general health information about menstrual cycles and PCOD. I can answer questions about irregular periods, symptoms, lifestyle tips, and when to see a doctor. Remember, I'm not a substitute for professional medical advice. What would you like to know?"
  }
};

export function HealthChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm your Aura health assistant. I can answer questions about menstrual health, PCOD, symptoms, and lifestyle tips. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, data] of Object.entries(HEALTH_RESPONSES)) {
      if (key === 'default') continue;
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }
    
    return HEALTH_RESPONSES.default.response;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Get bot response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: findResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-fab"
          title="Ask health questions"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <Bot size={24} />
              <div>
                <h3>Health Assistant</h3>
                <p className="chatbot-status">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="chatbot-close">
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.type}`}>
                {msg.type === 'bot' && (
                  <div className="chatbot-avatar">
                    <Bot size={16} />
                  </div>
                )}
                <div className="chatbot-message-content">
                  <p>{msg.text}</p>
                  <span className="chatbot-timestamp">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about menstrual health..."
              className="chatbot-input"
            />
            <button onClick={handleSend} className="chatbot-send" disabled={!input.trim()}>
              <Send size={20} />
            </button>
          </div>

          <div className="chatbot-disclaimer">
            ⚠️ For informational purposes only. Not medical advice.
          </div>
        </div>
      )}
    </>
  );
}
