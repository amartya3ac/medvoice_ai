-- Migration script for MedVoice AI

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table to store login info
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    phone_number TEXT,
    date_of_birth DATE,
    profile_photo TEXT,
    address TEXT,
    city TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    doctor_name TEXT NOT NULL,
    hospital TEXT NOT NULL,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table for chat history
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user',
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorite_sessions table for bookmarked chats
CREATE TABLE IF NOT EXISTS favorite_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    is_favorite BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Optimization: Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_favorite_sessions_user_id ON favorite_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_favorite_sessions_conversation_id ON favorite_sessions(conversation_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_sessions ENABLE ROW LEVEL SECURITY;

-- Clean and consolidated RLS Policies: Users can only manage their own data
-- Resolved security vulnerability by removing "OR auth.uid() IS NULL"

CREATE POLICY "Users can manage their own profile" ON users
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage their own appointments" ON appointments
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own conversations" ON conversations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own messages" ON messages
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorite sessions" ON favorite_sessions
    FOR ALL USING (auth.uid() = user_id);
