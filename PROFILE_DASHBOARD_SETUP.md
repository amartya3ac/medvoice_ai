# Profile Dashboard Setup Guide

## Database Migrations

The profile dashboard requires the following database updates. Run these SQL commands in your Supabase SQL Editor:

### 1. Update Users Table (Add Profile Fields)

```sql
-- Add new columns to users table if not already present
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_photo TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS country TEXT;
```

### 2. Create Favorite Sessions Table

```sql
-- Create favorite_sessions table
CREATE TABLE IF NOT EXISTS favorite_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    is_favorite BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE favorite_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can access their own favorite sessions" ON favorite_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorite sessions" ON favorite_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own favorite sessions" ON favorite_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorite sessions" ON favorite_sessions
    FOR DELETE USING (auth.uid() = user_id);
```

## Supabase Storage Setup

### Create Storage Bucket for Profile Photos

1. Go to your Supabase Dashboard
2. Navigate to **Storage** → **Buckets**
3. Click **New Bucket**
4. Name it: `profile_photos`
5. Keep it **Private** (RLS enabled)
6. Click **Create Bucket**

### Create Storage Policies

In the Supabase SQL Editor, run:

```sql
-- Create storage policy for users to upload their own photos
CREATE POLICY "Users can upload their own profile photo"
ON storage.objects
FOR INSERT
WITH CHECK (
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can read only their own photos
CREATE POLICY "Users can read their own profile photo"
ON storage.objects
FOR SELECT
USING (
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own profile photo
CREATE POLICY "Users can update their own profile photo"
ON storage.objects
FOR UPDATE
USING (
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## Features Implemented

### Profile Dashboard (Top Right Corner)
- **Profile Tab**: View and edit user information
  - Full Name
  - Phone Number
  - Address
  - City
  - Profile Photo
  
- **Chat History Tab**: View all past consultations
  - Shows all chat sessions with dates
  - Quick access to previous conversations
  
- **Favorites Tab**: View saved favorite sessions
  - Only shows sessions marked as favorites
  - Easy revisit of important consultations

### Save as Favorite Sessions
- **Heart Button**: Located next to PDF Export button
- Save important consultations for quick access
- Data saved to `favorite_sessions` table
- View all favorites in Profile Dashboard

## Responsive Design

All components are fully responsive:
- **Mobile**: Full-width dashboard slides from bottom
- **Tablet**: Optimized card layouts
- **Desktop**: Multi-column grid views

Components use:
- Tailwind CSS responsive classes (`sm:`, `md:`, `lg:`)
- Flexible layouts for any device
- Touch-friendly buttons and inputs
- Optimized spacing for all screen sizes

## Database Tables

### Users Table (Updated)
```
- id (UUID, PK)
- email (TEXT)
- full_name (TEXT)
- phone_number (TEXT)
- address (TEXT)
- city (TEXT)
- country (TEXT)
- profile_photo (TEXT - URL)
- date_of_birth (DATE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- last_login (TIMESTAMP)
```

### Favorite Sessions Table (New)
```
- id (UUID, PK)
- user_id (UUID, FK)
- conversation_id (UUID, FK)
- is_favorite (BOOLEAN)
- created_at (TIMESTAMP)
```

## Usage

### Open Profile Dashboard
1. Click the **user icon** in the top right corner (desktop)
2. Available after login

### Edit Profile
1. Open Profile Dashboard
2. Click **Edit Profile** button
3. Update information
4. Upload new profile photo
5. Click **Save Changes**

### Save a Session as Favorite
1. After generating a diagnostic report
2. Click the red **Heart** button (Save as Favorite)
3. Session appears in **Favorites** tab

### View Saved Sessions
1. Open Profile Dashboard
2. Go to **Chat History** or **Favorites** tab
3. See all past consultations

## Environment Variables

No additional env variables needed. The dashboard uses:
- Existing `NEXT_PUBLIC_SUPABASE_URL`
- Existing `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## API Integration

The dashboard directly uses Supabase client-side API:
- No additional API routes needed
- Row-Level Security (RLS) ensures data privacy
- Real-time updates via Supabase subscriptions (can be added)

## Security

✅ **Row Level Security (RLS)** enabled on all tables
✅ **User isolation**: Users only see their own data
✅ **Private storage**: Profile photos only accessible to owner
✅ **Auth integration**: Requires login to access dashboard

## Troubleshooting

### Profile photos not uploading?
- Ensure `profile_photos` bucket exists in Supabase Storage
- Check that storage policies are correctly created
- Verify bucket is not "Public"

### Favorite sessions not saving?
- Ensure `favorite_sessions` table is created
- Check that conversation_id is valid
- Verify RLS policies on favorite_sessions table

### Can't see profile dashboard?
- Must be logged in
- Ensure user data is loaded from auth

## Future Enhancements

Potential additions:
- Avatar/profile picture crop editor
- Export chat history as PDF
- Share favorite sessions with other users
- Session search and filtering
- Custom session notes/tags
