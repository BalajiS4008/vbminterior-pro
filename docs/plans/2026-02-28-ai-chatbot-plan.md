# VBM Interior AI Chatbot — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a floating AI chatbot widget powered by Claude API that answers interior design questions and captures leads via Make.com webhook.

**Architecture:** React component (ChatBot.jsx) renders a floating bubble bottom-right that expands into a chat window. Messages are sent to a Vercel serverless function (api/chat.js) which proxies to Claude API with a VBM-specific system prompt. When Claude detects consultation intent, an inline lead form appears in the chat.

**Tech Stack:** React 19, Vercel Serverless Functions, Claude API (claude-sonnet-4-6), Make.com webhook

**Design Doc:** `docs/plans/2026-02-28-ai-chatbot-design.md`

---

### Task 1: Create Vercel Serverless Function (API Proxy)

**Files:**
- Create: `api/chat.js`

**Step 1: Create the `api/` directory and serverless function**

Create `api/chat.js` — this is the Vercel convention for serverless functions. The file exports a default handler.

```js
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

const SYSTEM_PROMPT = `You are VBM Interior's friendly design assistant. VBM Interior is a premium interior design company based in India offering end-to-end interior design services including full home interiors, modular kitchens, wardrobes, TV units, study areas, and bathroom renovations.

You help visitors with:
- Interior design questions (styles, materials, budgets, timelines)
- VBM's services and process (consultation → design → production → installation → handover)
- Understanding pricing ranges (but never quote exact prices — direct them to book a free consultation)
- Design inspiration and trends

Be warm, knowledgeable, and concise. Use the visitor's name if they share it.

IMPORTANT RULES:
1. Keep responses under 150 words.
2. Never fabricate specific pricing — say "pricing depends on scope, let me connect you with our team for a free consultation."
3. When the user expresses ANY of these intents:
   - Wants to book a consultation or meeting
   - Asks for a quote or cost estimate
   - Wants to visit the showroom
   - Wants to hire VBM or start a project
   - Shares their budget and asks to proceed
   - Says things like "I'm interested", "let's do it", "how do I get started"
   ...you MUST append this exact JSON on a new line at the very end of your response:
   {"cta_trigger": true}
4. Do NOT include the JSON for casual browsing questions.`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Call Claude API
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6-20250514',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-20), // Keep last 20 messages for context window
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', errorData);
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const rawReply = data.content[0].text;

    // Parse CTA trigger from response
    let reply = rawReply;
    let cta_trigger = false;

    const ctaMatch = rawReply.match(/\{"cta_trigger":\s*true\}\s*$/);
    if (ctaMatch) {
      reply = rawReply.replace(ctaMatch[0], '').trim();
      cta_trigger = true;
    }

    return res.status(200).json({ reply, cta_trigger });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

**Step 2: Commit**

```bash
git add api/chat.js
git commit -m "feat: add Vercel serverless function for Claude API chat proxy"
```

---

### Task 2: Create ChatBot CSS

**Files:**
- Create: `src/components/ChatBot.css`

**Step 1: Write all chatbot styles**

This file contains all styles for the bubble, chat window, messages, lead form, and mobile responsiveness. Uses existing CSS variables from `src/index.css`.

```css
/* ===== Chatbot Bubble ===== */
.chatbot-bubble {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: var(--navy);
  border: 2px solid var(--cta-border);
  cursor: pointer;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(10, 22, 40, 0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.chatbot-bubble:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(10, 22, 40, 0.5);
}

.chatbot-bubble-icon {
  width: 32px;
  height: 32px;
  color: var(--cta-gold);
}

/* Pulse animation on load */
.chatbot-bubble::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid var(--cta-gold);
  animation: chatbotPulse 2s ease-out 3;
  opacity: 0;
}

@keyframes chatbotPulse {
  0% { transform: scale(0.95); opacity: 0.7; }
  100% { transform: scale(1.3); opacity: 0; }
}

/* Close icon when open */
.chatbot-bubble-close {
  width: 24px;
  height: 24px;
  color: #fff;
}

/* ===== Chat Window ===== */
.chatbot-window {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 380px;
  height: 520px;
  background: var(--bg-white);
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: chatWindowSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes chatWindowSlideUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ===== Header ===== */
.chatbot-header {
  background: linear-gradient(135deg, #0a1628 0%, #132238 100%);
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.chatbot-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--cta-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chatbot-avatar svg {
  width: 22px;
  height: 22px;
  color: var(--navy);
}

.chatbot-header-info {
  flex: 1;
}

.chatbot-header-title {
  color: #fff;
  font-family: 'Rosarivo', serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.chatbot-header-status {
  color: #4ade80;
  font-size: 0.72rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.chatbot-header-status::before {
  content: '';
  width: 7px;
  height: 7px;
  background: #4ade80;
  border-radius: 50%;
  display: inline-block;
}

.chatbot-header-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 4px;
  display: flex;
  transition: color 0.2s ease;
}

.chatbot-header-close:hover {
  color: #fff;
}

.chatbot-header-close svg {
  width: 20px;
  height: 20px;
}

/* ===== Messages Area ===== */
.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: var(--bg-light);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chatbot-messages::-webkit-scrollbar {
  width: 4px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

/* Message bubbles */
.chatbot-msg {
  display: flex;
  gap: 8px;
  max-width: 85%;
  animation: msgFadeIn 0.25s ease-out;
}

@keyframes msgFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.chatbot-msg-bot {
  align-self: flex-start;
}

.chatbot-msg-user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.chatbot-msg-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--navy);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.chatbot-msg-avatar svg {
  width: 14px;
  height: 14px;
  color: var(--cta-gold);
}

.chatbot-msg-bubble {
  padding: 10px 14px;
  border-radius: 14px;
  font-family: 'Rosarivo', serif;
  font-size: 0.88rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.chatbot-msg-bot .chatbot-msg-bubble {
  background: #fff;
  color: var(--text-primary);
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.chatbot-msg-user .chatbot-msg-bubble {
  background: var(--cta-gold);
  color: var(--text-primary);
  border-bottom-right-radius: 4px;
}

/* Typing indicator */
.chatbot-typing {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  align-self: flex-start;
  background: #fff;
  border-radius: 14px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.chatbot-typing-dot {
  width: 7px;
  height: 7px;
  background: #94a3b8;
  border-radius: 50%;
  animation: typingBounce 1.4s infinite ease-in-out;
}

.chatbot-typing-dot:nth-child(2) { animation-delay: 0.16s; }
.chatbot-typing-dot:nth-child(3) { animation-delay: 0.32s; }

@keyframes typingBounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

/* ===== Input Area ===== */
.chatbot-input-area {
  padding: 12px 14px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  gap: 8px;
  align-items: center;
  background: #fff;
  flex-shrink: 0;
}

.chatbot-input {
  flex: 1;
  border: 1.5px solid #e0e0e0;
  border-radius: 24px;
  padding: 10px 16px;
  font-family: 'Rosarivo', serif;
  font-size: 0.88rem;
  outline: none;
  transition: border-color 0.2s ease;
  color: var(--text-primary);
  background: var(--bg-light);
}

.chatbot-input:focus {
  border-color: var(--cta-border);
}

.chatbot-input::placeholder {
  color: #94a3b8;
}

.chatbot-send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--cta-gold);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.15s ease;
  flex-shrink: 0;
}

.chatbot-send-btn:hover {
  background: #e6c01e;
  transform: scale(1.05);
}

.chatbot-send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.chatbot-send-btn svg {
  width: 18px;
  height: 18px;
  color: var(--navy);
}

/* ===== Lead Form (inline in chat) ===== */
.chatbot-lead-form {
  background: #fff;
  border: 2px solid var(--cta-border);
  border-radius: 14px;
  padding: 18px;
  margin: 4px 0;
  align-self: flex-start;
  width: 90%;
  animation: msgFadeIn 0.3s ease-out;
}

.chatbot-lead-form h4 {
  font-family: 'Rosarivo', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 14px;
}

.chatbot-lead-form .lead-field {
  margin-bottom: 10px;
}

.chatbot-lead-form .lead-field input {
  width: 100%;
  padding: 9px 12px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Rosarivo', serif;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s ease;
  color: var(--text-primary);
}

.chatbot-lead-form .lead-field input:focus {
  border-color: var(--cta-border);
}

.chatbot-lead-form .lead-field input::placeholder {
  color: #94a3b8;
}

.chatbot-lead-submit {
  width: 100%;
  padding: 11px;
  background: var(--cta-gold);
  color: var(--text-primary);
  border: 2px solid var(--cta-border);
  border-radius: 10px;
  font-family: 'Rosarivo', serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-top: 4px;
}

.chatbot-lead-submit:hover {
  background: #e6c01e;
}

.chatbot-lead-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chatbot-lead-success {
  text-align: center;
  color: #065f46;
  font-family: 'Rosarivo', serif;
  font-size: 0.88rem;
  padding: 12px;
  background: #ecfdf5;
  border-radius: 10px;
  border: 1px solid #10b981;
}

/* ===== Mobile Responsive ===== */
@media (max-width: 480px) {
  .chatbot-window {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    border-radius: 16px 16px 0 0;
  }

  .chatbot-bubble {
    bottom: 16px;
    right: 16px;
    width: 56px;
    height: 56px;
  }

  .chatbot-bubble-icon {
    width: 28px;
    height: 28px;
  }
}
```

**Step 2: Commit**

```bash
git add src/components/ChatBot.css
git commit -m "feat: add chatbot widget styles with VBM theme"
```

---

### Task 3: Create ChatBot React Component

**Files:**
- Create: `src/components/ChatBot.jsx`

**Step 1: Write the full ChatBot component**

This is the main component with all logic: bubble toggle, message handling, API calls, CTA detection, and lead form submission.

```jsx
import { useState, useRef, useEffect } from 'react';
import { IoChatbubbleEllipses, IoClose, IoSend } from 'react-icons/io5';
import { MdArchitecture } from 'react-icons/md';
import './ChatBot.css';

const OPENING_MESSAGE = {
  role: 'assistant',
  content: "Hello! I'm VBM Interior's design assistant. Whether you're dreaming of a new living room, planning a modular kitchen, or just exploring ideas \u2014 I'm here to help. What can I assist you with?",
};

const ChatBot = () => {
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
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Send only role + content to API
      const apiMessages = updatedMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      const botMsg = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, botMsg]);

      // Show lead form if CTA triggered and not already submitted
      if (data.cta_trigger && !leadSubmitted) {
        setShowLeadForm(true);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or call us directly for assistance.",
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
    setLeadData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitLead = async (e) => {
    e.preventDefault();
    setLeadSending(true);

    try {
      const res = await fetch(
        'https://hook.eu1.make.com/c7b1gq68r4k6lbe972zmboyg860gejj9',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        }
      );

      if (res.ok) {
        setLeadSubmitted(true);
        setShowLeadForm(false);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Thank you, ${leadData.name}! Our design team will reach out to you shortly. We look forward to creating your dream space!`,
          },
        ]);
      }
    } catch (err) {
      console.error('Lead submit error:', err);
    } finally {
      setLeadSending(false);
    }
  };

  // Bot avatar small icon
  const BotIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

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
            <button className="chatbot-header-close" onClick={toggleChat} aria-label="Close chat">
              <IoClose />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg-${msg.role === 'assistant' ? 'bot' : 'user'}`}>
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

            {/* Lead Form */}
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
                <button type="submit" className="chatbot-lead-submit" disabled={leadSending}>
                  {leadSending ? 'Sending...' : 'Book My Consultation'}
                </button>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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
      <button className="chatbot-bubble" onClick={toggleChat} aria-label={isOpen ? 'Close chat' : 'Open chat'}>
        {isOpen ? (
          <IoClose className="chatbot-bubble-close" />
        ) : (
          <IoChatbubbleEllipses className="chatbot-bubble-icon" />
        )}
      </button>
    </>
  );
};

export default ChatBot;
```

**Step 2: Commit**

```bash
git add src/components/ChatBot.jsx
git commit -m "feat: add ChatBot component with Claude AI and lead capture"
```

---

### Task 4: Integrate ChatBot into App.jsx

**Files:**
- Modify: `src/App.jsx`

**Step 1: Add ChatBot import and render**

Add these two changes to `src/App.jsx`:

1. Add import at top (after ContactModal import):
```jsx
import ChatBot from './components/ChatBot';
```

2. Add `<ChatBot />` inside the `<div className="app">`, after the ContactModal line:
```jsx
{showModal && <ContactModal onClose={closeModal} />}
<ChatBot />
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: integrate ChatBot widget into App layout"
```

---

### Task 5: Install io5 icons dependency (if needed) and verify

**Step 1: Check if react-icons is already installed**

Run: `npm ls react-icons`

react-icons is already in package.json (^5.5.0) which includes `io5` and `md` icon sets. No new dependency needed.

**Step 2: Run the dev server and verify**

Run: `npm run dev`

Verify:
- Floating bubble appears bottom-right with gold chat icon on navy background
- Gold pulse ring animates 3 times on load
- Click bubble → chat window slides up
- Opening message from bot is visible
- Type a message, press Enter → message appears as gold bubble on right
- Typing indicator shows (3 bouncing dots)
- Bot response appears after API call
- Click bubble again → window closes, bubble shows chat icon again

**Step 3: Test CTA flow manually**

In the chat, type: "I want to book a consultation for my 3BHK apartment"

Verify:
- Bot responds with a relevant message
- Lead form card appears inline in the chat
- Form has 4 fields: Name, Contact No, Email, Location
- Submit sends POST to Make.com webhook
- Success message appears in chat
- Form doesn't reappear in subsequent messages

**Step 4: Test mobile (resize browser to < 480px)**

Verify:
- Chat window goes full-width
- Bubble moves to 16px from edges, slightly smaller
- Input area is accessible, not hidden by keyboard

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: VBM AI chatbot complete — Claude-powered with lead capture"
```

---

### Task 6: Configure Vercel Environment Variable

**Step 1: Add ANTHROPIC_API_KEY to Vercel**

This is a manual step. In Vercel dashboard:
1. Go to project Settings → Environment Variables
2. Add: `ANTHROPIC_API_KEY` = your Anthropic API key
3. Apply to Production, Preview, and Development environments

Or via CLI:
```bash
vercel env add ANTHROPIC_API_KEY
```

**Step 2: Deploy and verify in production**

```bash
vercel --prod
```

Verify the chatbot works end-to-end in the deployed environment.
