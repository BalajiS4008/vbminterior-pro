# VBM Interior AI Chatbot — Design Document

**Date:** 2026-02-28
**Status:** Approved

## Overview

A floating AI chatbot widget for the VBM Interior website, powered by Claude API via Vercel serverless functions. The bot answers interior design questions, provides info about VBM services, and captures leads when it detects booking/consultation intent.

## Tech Stack

- **Frontend:** React component (ChatBot.jsx + ChatBot.css)
- **Backend:** Vercel serverless function (api/chat.js)
- **AI:** Claude API (claude-sonnet-4-6)
- **Webhook:** Make.com for lead data

## Component Architecture

```
App.jsx
├── ChatBot.jsx          (main widget: bubble + chat window)
├── ChatBot.css          (all chatbot styles)
└── api/chat.js          (Vercel serverless → Claude API)
```

ChatBot.jsx is rendered in App.jsx alongside ContactModal. Self-contained — manages its own state, no props from App.

## UI Design

### Floating Bubble (closed)
- Bottom-right corner, 60px circle
- Navy background (#0a1628), custom bot icon
- Gold pulse ring animation on load
- 20px from edges, z-index: 9999

### Chat Window (open)
- 380px wide x 520px tall, slides up from bubble
- **Header:** Navy gradient, VBM avatar, "VBM Design Assistant", close button
- **Messages:** Scrollable, #F5F2F2 background
  - Bot: white cards, left-aligned, small avatar
  - User: gold (#FAD221) background, right-aligned, dark text
- **Input:** Text input + gold send button
- **Lead form:** Inline card in chat flow when CTA triggers
- Font: Rosarivo. Border-radius: 15px.

### Mobile
- Full-width on < 480px
- Height: calc(100vh - 120px)
- Bubble: 56px

## Conversation Design

### System Prompt
```
You are VBM Interior's design assistant. VBM Interior is a premium
interior design company based in India. You help visitors with:
- Interior design questions (styles, materials, budgets, timelines)
- VBM's services (full home interiors, modular kitchens, wardrobes, etc.)
- Booking consultations

Be warm, knowledgeable, and concise. Use the visitor's name if known.

CRITICAL: When the user expresses intent to:
- Book a consultation or meeting
- Get a quote or estimate
- Visit the showroom
- Hire VBM or start a project

...respond with your message AND include this exact JSON at the end:
{"cta_trigger": true, "reason": "<why>"}

Keep responses under 150 words. Never make up pricing.
```

### Opening Message
"Hello! I'm VBM Interior's design assistant. Whether you're dreaming of a new living room, planning a modular kitchen, or just exploring ideas — I'm here to help. What can I assist you with?"

## CTA / Lead Capture Flow

1. Claude returns `{"cta_trigger": true}` in response
2. Frontend strips JSON, shows bot message normally
3. Inline lead form card appears below message:
   - Name (text)
   - Contact No (tel)
   - Gmail (email)
   - Location (text)
   - "Book My Consultation" button (gold)
4. Submit → POST to `https://hook.eu1.make.com/c7b1gq68r4k6lbe972zmboyg860gejj9`
   - Payload: `{ name, contact_no, gmail, location }`
5. Success: "Thank you, [name]! Our team will reach out shortly."
6. Chat continues after submission. Form only shown once.

## Serverless API

### Endpoint: POST /api/chat

**Request:**
```json
{ "messages": [{ "role": "user|assistant", "content": "..." }] }
```

**Response:**
```json
{ "reply": "cleaned message text", "cta_trigger": false }
```

**Logic:**
1. Receive conversation history
2. Prepend VBM system prompt
3. Call Claude API (claude-sonnet-4-6)
4. Parse: extract CTA JSON flag if present, return clean reply + flag
5. Env var: ANTHROPIC_API_KEY

## State (all in ChatBot.jsx)

- `isOpen` — bubble vs window
- `messages[]` — conversation history
- `isTyping` — typing indicator
- `showLeadForm` — inline form toggle
- `leadData` — form values { name, contact_no, gmail, location }
- `leadSubmitted` — prevent duplicate form display

## Design Tokens

Uses existing CSS variables:
- `--navy: #0a1628` (header, bubble)
- `--cta-gold: #FAD221` (user messages, buttons)
- `--cta-border: #FACC00` (button borders)
- `--bg-light: #F5F2F2` (message area)
- `--text-primary: #0C0C0C`
- `--shadow-lg` for chat window elevation
- Font: Rosarivo
