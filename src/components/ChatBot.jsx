import { useState, useRef, useEffect } from 'react';
import { IoChatbubbleEllipses, IoClose, IoSend } from 'react-icons/io5';
import { MdArchitecture } from 'react-icons/md';
import './ChatBot.css';

const OPENING_MESSAGE = {
  role: 'assistant',
  content:
    "Hello! I'm VBM Interior's design assistant. Whether you're dreaming of a new living room, planning a modular kitchen, or just exploring ideas \u2014 I'm here to help. What can I assist you with?",
};

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([OPENING_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    contact_no: '',
    gmail: '',
    location: '',
  });
  const [leadSending, setLeadSending] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showLeadForm]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);

      if (data.cta_trigger && !leadSubmitted) {
        setShowLeadForm(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLeadChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prev) => ({ ...prev, [name]: value }));
  };

  const submitLead = async (e) => {
    e.preventDefault();
    setLeadSending(true);

    try {
      await fetch(
        'https://hook.eu1.make.com/4uiive3mt8vhwax8eas3z3nu53v6l8pw',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...leadData,
            chat_history: messages
              .map((m) => `${m.role === 'assistant' ? 'Bot' : 'User'}: ${m.content}`)
              .join('\n'),
          }),
        }
      );

      setLeadSubmitted(true);
      setShowLeadForm(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Thank you, ${leadData.name}! Our design team will reach out to you shortly to schedule your free consultation. We're excited to help bring your vision to life!`,
        },
      ]);
    } finally {
      setLeadSending(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <MdArchitecture />
            </div>
            <div className="chatbot-header-info">
              <div className="chatbot-header-title">VBM Design Assistant</div>
              <div className="chatbot-header-status">Online</div>
            </div>
            <button className="chatbot-header-close" onClick={toggleChat}>
              <IoClose />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-msg chatbot-msg-${msg.role === 'assistant' ? 'bot' : 'user'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="chatbot-msg-avatar">
                    <BotIcon />
                  </div>
                )}
                <div className="chatbot-msg-bubble">{msg.content}</div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chatbot-typing">
                <div className="chatbot-typing-dot" />
                <div className="chatbot-typing-dot" />
                <div className="chatbot-typing-dot" />
              </div>
            )}

            {/* Lead Form (inline) */}
            {showLeadForm && !leadSubmitted && (
              <form className="chatbot-lead-form" onSubmit={submitLead}>
                <h4>Book Your Free Consultation</h4>
                <div className="lead-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={leadData.name}
                    onChange={handleLeadChange}
                    required
                  />
                </div>
                <div className="lead-field">
                  <input
                    type="tel"
                    name="contact_no"
                    placeholder="Contact Number"
                    value={leadData.contact_no}
                    onChange={handleLeadChange}
                    required
                  />
                </div>
                <div className="lead-field">
                  <input
                    type="email"
                    name="gmail"
                    placeholder="Email Address"
                    value={leadData.gmail}
                    onChange={handleLeadChange}
                    required
                  />
                </div>
                <div className="lead-field">
                  <input
                    type="text"
                    name="location"
                    placeholder="Your Location"
                    value={leadData.location}
                    onChange={handleLeadChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="chatbot-lead-submit"
                  disabled={leadSending}
                >
                  {leadSending ? 'Sending...' : 'Book My Consultation'}
                </button>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              className="chatbot-input"
              type="text"
              placeholder="Ask about interior design..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              className="chatbot-send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <IoSend />
            </button>
          </div>
        </div>
      )}

      {/* Floating Bubble */}
      <button
        className="chatbot-bubble"
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <IoClose className="chatbot-bubble-close" />
        ) : (
          <IoChatbubbleEllipses className="chatbot-bubble-icon" />
        )}
      </button>
    </>
  );
}
