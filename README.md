# MedVoice AI - Advanced AI Medical Diagnostic System

**Version:** 1.0.0  
**Copyright © 2026 Amartya Chakraborty. All rights reserved.**

## Overview

MedVoice AI is a cutting-edge medical diagnostic platform powered by artificial intelligence. It provides intelligent analysis of medical symptoms, prescription scanning, and personalized treatment recommendations. The system integrates advanced LLM capabilities with secure cloud infrastructure for HIPAA-compliant healthcare solutions.

## ✨ Key Features

- 🤖 **AI-Powered Diagnosis** - Advanced symptom analysis using Google Gemini and Groq LLaMA models
- 📸 **Prescription Scanning** - OCR-based medication extraction from prescription images
- 💬 **Intelligent Chatbot** - Multi-turn conversational medical analysis
- 👨‍⚕️ **Doctor Matching** - Smart specialist recommendation based on location and expertise
- 📅 **Appointment Booking** - Integrated booking system for doctor consultations
- 🎤 **Voice Control** - Speech-to-text and text-to-speech capabilities
- 📊 **Medical Reports** - Export diagnostic reports as PDF
- � **User Profile Dashboard** - View/edit profile, chat history, and favorite sessions
- 💾 **Save as Favorites** - Bookmark important consultations for quick revisit
- �🔐 **Secure Authentication** - Supabase auth with encrypted data storage
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 16.1.6 (React 19.2.3)
- **Styling:** Tailwind CSS 4
- **UI Components:** Lucide React Icons (100+ medical icons)
- **Animations:** GSAP 3.14.2 (GPU-accelerated)
- **Fonts:** Fontsource Inter & Outfit
- **Type Safety:** TypeScript 5
- **State Management:** React Hooks + useChat API

### Backend

- **Framework:** FastAPI + Uvicorn
- **AI Orchestration:** LangGraph
- **LLM Providers:**
  - Google Generative AI (Gemini 1.5 Flash)
  - Groq API (Llama 3.3 70B)
- **OCR Engine:** Google Vision API via Gemini
- **Task Queue:** Native async/await

### Database & Storage

- **Database:** Supabase PostgreSQL
- **Auth:** Supabase Auth with JWT
- **ORM:** Supabase JS & Python clients
- **RLS:** Row-level security on all tables
- **Tables:** Users, Appointments, Messages, Conversations

### API & Integration

- **AI SDK:** Vercel AI SDK (@ai-sdk/google, @ai-sdk/react)
- **HTTP:** Supabase client with WebSocket support
- **CORS:** FastAPI CORS Middleware

### DevOps & Tools

- **Build:** Next.js with SWC compiler
- **Linting:** ESLint 9
- **Package Manager:** npm
- **Process Manager:** Concurrently (dev parallel execution)

---

## 📁 Project Structure

```
MedVoiceAi-master/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── analyze-prescription/route.ts
│   │   │   ├── chat/route.ts
│   │   │   ├── book/route.ts
│   │   │   └── health/route.ts
│   │   ├── login/                  # Auth pages
│   │   │   ├── page.tsx
│   │   │   └── actions.ts
│   │   ├── chatbot/                # Main application
│   │   │   ├── page.tsx
│   │   │   ├── ChatbotUI.tsx
│   │   │   └── doctorsData.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/                 # Reusable components
│   │   ├── chatbot/
│   │   │   ├── ChatbotUI.tsx
│   │   │   ├── BookingModal.tsx
│   │   │   └── Sidebar.tsx
│   │   └── layout/
│   │       └── Navbar.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── middleware.ts
│   └── utils/
│       └── supabase/
├── backend/
│   ├── main.py
│   ├── orchestrator.py
│   ├── supabase_client.py
│   ├── requirements.txt
│   └── database/
│       └── migrations.sql
├── public/
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- Python 3.9+
- Supabase account
- API Keys: GEMINI_API_KEY, GROQ_API_KEY

### Quick Start

```bash
# Clone
git clone https://github.com/amartya3ac/medvoice_ai.git
cd medvoice_ai

# Install dependencies
npm install
cd backend && pip install -r requirements.txt && cd ..

# Setup .env.local
# Copy your Supabase URL, keys, and API keys

# Run
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:8000

---

## 📦 Dependencies (Optimized & Cleaned)

### Removed Unused Packages ✂️

- ❌ `html2pdf.js` (650KB) - Replaced with native browser print dialog
- ❌ `@ai-sdk/openai` - Not used (using Google & Groq only)
- ❌ `@types/html2pdf.js` - Type definitions for removed package

### Production Dependencies (Used Only)

| Package               | Version | Purpose         |
| --------------------- | ------- | --------------- |
| next                  | 16.1.6  | React framework |
| react                 | 19.2.3  | UI library      |
| react-dom             | 19.2.3  | DOM rendering   |
| tailwindcss           | 4       | CSS framework   |
| gsap                  | 3.14.2  | Animations      |
| lucide-react          | 0.577.0 | Icons           |
| ai                    | 6.0.116 | AI SDK core     |
| @ai-sdk/google        | 3.0.43  | Google AI       |
| @ai-sdk/react         | 3.0.118 | React AI hooks  |
| @supabase/supabase-js | 2.99.0  | Database client |
| @supabase/ssr         | 0.9.0   | SSR support     |
| @fontsource/inter     | 5.2.8   | Font            |
| @fontsource/outfit    | 5.2.8   | Font            |

---

## 🔐 Security

✅ JWT authentication  
✅ Row-level security (RLS)  
✅ HTTPS/TLS encryption  
✅ Environment variable isolation  
✅ No exposed API keys  
✅ HIPAA-compliant architecture

---

## 👨‍💻 Developer Contact

**Amartya Chakraborty**

📧 Email: [amartyahub03@gmail.com](mailto:amartyahub03@gmail.com)  
💼 LinkedIn: [Amartya Chakraborty](https://www.linkedin.com/in/amartya-chakraborty-056262234/)  
🐙 GitHub: [@amartya3ac](https://github.com/amartya3ac)  
📦 Repository: [medvoice_ai](https://github.com/amartya3ac/medvoice_ai)

---

## 📜 License

MIT License © 2026 Amartya Chakraborty

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Google AI Studio](https://makersuite.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Built with ❤️ for healthcare innovation**

_MedVoice AI - Where AI meets Medical Expertise_
