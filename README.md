# 🩺 MedVoice AI — Advanced AI Medical Diagnostic System

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Google-Gemini-AI?logo=google" alt="Gemini" />
  <img src="https://img.shields.io/badge/Groq-LLaMA%203-orange" alt="Groq" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License" />
</p>

> **AI-powered medical diagnostic assistant combining voice interaction, prescription analysis, and intelligent healthcare recommendations.**

**Version:** 1.0.0  
**Author:** Amartya Chakraborty  
**Copyright:** © 2026

---

## 🚀 Overview

**MedVoice AI** is an advanced AI healthcare assistant designed to help users analyze symptoms, understand prescriptions, and receive intelligent medical guidance.

The platform integrates **large language models, OCR-based prescription scanning, and conversational AI** into a unified diagnostic system.

It uses **secure cloud infrastructure with Supabase and AI orchestration pipelines** to deliver scalable medical analysis.

---

## 🌐 Live Application

<p align="center">
  <a href="https://medvoice-ai-nine.vercel.app/">
    <img src="https://img.shields.io/badge/🚀%20Visit%20MedVoice%20AI-Live%20Application-blue?style=for-the-badge" alt="Visit MedVoice AI" />
  </a>
</p>

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://medvoice-ai-nine.vercel.app/)

You can directly try the AI medical assistant online without installing anything.

---

## ✨ Key Features

### 🤖 AI Diagnosis Engine
- Symptom analysis using **Google Gemini** and **Groq LLaMA**
- Intelligent disease probability estimation
- Conversational reasoning for medical queries

### 📸 Prescription Scanner
- Upload prescription images
- AI extracts medicines and instructions
- Automatic medication explanation

### 💬 AI Chatbot
- Multi-turn medical conversations
- Context-aware responses
- Personalized health insights

### 👨‍⚕️ Doctor Recommendation
- Smart specialist matching
- Based on symptoms and location
- Quick access to relevant doctors

### 📅 Appointment Booking
- Integrated consultation booking
- Secure appointment management
- Patient-doctor interaction system

### 🎤 Voice Interaction
- Speech-to-text medical queries
- Text-to-speech responses
- Hands-free medical assistant

### 📊 Medical Reports
- Export diagnostic reports as **PDF**
- Shareable health summaries

### 🔐 Secure Authentication
- Supabase Auth with JWT
- Encrypted database storage
- HIPAA-ready architecture

### 📱 Responsive Design
- Works across **desktop, tablet, and mobile**

---

## 🧠 AI Architecture

MedVoice AI uses a **hybrid multi-model AI pipeline**.

| AI Component | Purpose |
| :--- | :--- |
| **Google Gemini 1.5 Flash** | Medical reasoning and NLP |
| **Groq LLaMA 3.3 70B** | Ultra-fast conversational responses |
| **LangGraph** | AI workflow orchestration |
| **Google Vision OCR** | Prescription image analysis |

**Benefits:**
- ⚡ Fast responses
- 🧠 Accurate reasoning
- 🔄 Context-aware conversations

---

## 🛠 Tech Stack

### 🖥 Frontend

| Technology | Purpose |
| :--- | :--- |
| ![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js) | React framework |
| ![React](https://img.shields.io/badge/React-blue?logo=react) | UI library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript) | Type safety |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss) | Styling |
| ![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02) | Animations |
| ![Lucide](https://img.shields.io/badge/Lucide-Icons-black) | Icon library |

### ⚙ Backend

| Technology | Purpose |
| :--- | :--- |
| ![FastAPI](https://img.shields.io/badge/FastAPI-green?logo=fastapi) | Backend API |
| ![Python](https://img.shields.io/badge/Python-3776AB?logo=python) | Runtime |
| ![LangGraph](https://img.shields.io/badge/LangGraph-AI%20Workflow-purple) | AI orchestration |
| ![Uvicorn](https://img.shields.io/badge/Uvicorn-ASGI-blue) | ASGI server |

### 🗄 Database & Authentication

| Technology | Purpose |
| :--- | :--- |
| ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase) | Database |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql) | Data storage |
| ![JWT](https://img.shields.io/badge/JWT-Auth-black?logo=jsonwebtokens) | Authentication |
| ![RLS](https://img.shields.io/badge/RLS-Security-red) | Row-level security |

**Tables:**
- Users
- Conversations
- Messages
- Appointments

---

## 📁 Project Structure

```text
MedVoiceAi/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze-prescription/
│   │   │   ├── chat/
│   │   │   ├── book/
│   │   │   └── health/
│   │   ├── login/
│   │   ├── chatbot/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── chatbot/
│   │   │   ├── ChatbotUI.tsx
│   │   │   ├── BookingModal.tsx
│   │   │   └── Sidebar.tsx
│   │   └── layout/
│   │       └── Navbar.tsx
│   │
├── backend/
│   ├── main.py
│   ├── orchestrator.py
│   ├── supabase_client.py
│   └── database/
│       └── migrations.sql
│
├── public/
├── package.json
└── README.md
