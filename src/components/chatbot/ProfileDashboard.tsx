'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Phone,
  MapPin,
  Camera,
  Mail,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
  Loader2,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { logout } from '@/app/login/actions';

interface ProfileData {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  address: string;
  city: string;
  profile_photo: string;
}

interface ChatHistory {
  id: string;
  title: string;
  created_at: string;
  is_favorite: boolean;
}

export default function ProfileDashboard({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}) {
  const supabase = createClient();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'chats' | 'favorites'>('profile');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileData>>({});
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // Load profile data
  useEffect(() => {
    if (isOpen && user) {
      loadProfile();
      loadChatHistory();
    }
  }, [isOpen, user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile(data);
        setFormData(data);
        setPhotoUrl(data.profile_photo || '');
      } else {
        // Create a default profile from auth user if not in database
        const defaultProfile: ProfileData = {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || '',
          phone_number: '',
          address: '',
          city: '',
          profile_photo: '',
        };
        setProfile(defaultProfile);
        setFormData(defaultProfile);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      // Fallback profile with at least email
      const fallbackProfile: ProfileData = {
        id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || '',
        phone_number: '',
        address: '',
        city: '',
        profile_photo: '',
      };
      setProfile(fallbackProfile);
      setFormData(fallbackProfile);
    } finally {
      setLoading(false);
    }
  };

  const loadChatHistory = async () => {
    try {
      const { data: conversations } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(50);

      if (conversations) {
        // Get favorite status for each conversation
        const { data: favorites } = await supabase
          .from('favorite_sessions')
          .select('conversation_id')
          .eq('user_id', user.id);

        const favoriteIds = new Set(favorites?.map((f) => f.conversation_id) || []);

        const chatsWithFavorite = conversations.map((conv) => ({
          ...conv,
          is_favorite: favoriteIds.has(conv.id),
        }));

        setChatHistory(chatsWithFavorite);
      }
    } catch (err) {
      console.error('Error loading chat history:', err);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `${user.id}-${Date.now()}`;
      const { data, error } = await supabase.storage
        .from('profile_photos')
        .upload(fileName, file, { upsert: true });

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from('profile_photos')
          .getPublicUrl(fileName);

        setPhotoUrl(urlData.publicUrl);
        setFormData({ ...formData, profile_photo: urlData.publicUrl });
      }
    } catch (err) {
      console.error('Error uploading photo:', err);
      alert('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          address: formData.address,
          city: formData.city,
          profile_photo: photoUrl,
          updated_at: new Date(),
        })
        .eq('id', user.id);

      if (!error) {
        setProfile({ ...profile, ...formData, profile_photo: photoUrl } as any);
        setEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Failed to save profile');
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card bg-slate-900/95 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/10 p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-2xl font-bold text-white">Profile Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        ) : (
          <div className="p-4 sm:p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {['profile', 'chats', 'favorites'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {tab === 'profile' && <User className="w-4 h-4 mr-2 inline" />}
                  {tab === 'chats' && <MessageSquare className="w-4 h-4 mr-2 inline" />}
                  {tab === 'favorites' && <Heart className="w-4 h-4 mr-2 inline" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && profile && (
              <div className="space-y-6">
                {!editing ? (
                  <>
                    {/* Profile Photo */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 overflow-hidden flex items-center justify-center">
                          {profile.profile_photo ? (
                            <img
                              src={profile.profile_photo}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-12 h-12 text-blue-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold text-white">{profile.full_name || 'User'}</h3>
                        <p className="text-slate-400 text-sm flex items-center justify-center sm:justify-start gap-2 mt-2">
                          <Mail className="w-4 h-4" />
                          {profile.email}
                        </p>
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-slate-400 text-sm flex items-center gap-2 mb-1">
                          <Phone className="w-4 h-4" />
                          Phone
                        </p>
                        <p className="text-white font-medium">{profile.phone_number || 'Not set'}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-slate-400 text-sm flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4" />
                          City
                        </p>
                        <p className="text-white font-medium">{profile.city || 'Not set'}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 sm:col-span-2">
                        <p className="text-slate-400 text-sm flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4" />
                          Address
                        </p>
                        <p className="text-white font-medium">{profile.address || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setEditing(true)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/30 transition-all font-medium flex items-center justify-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 transition-all font-medium flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Edit Mode */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Profile Photo
                      </label>
                      <label className="flex items-center justify-center w-32 h-32 rounded-2xl bg-white/5 border-2 border-dashed border-blue-500/50 cursor-pointer hover:bg-white/10 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center gap-2">
                          {uploading ? (
                            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                          ) : (
                            <Camera className="w-6 h-6 text-blue-400" />
                          )}
                          <span className="text-xs text-slate-400 text-center">Upload Photo</span>
                        </div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.full_name || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, full_name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone_number || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, phone_number: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Address
                      </label>
                      <textarea
                        value={formData.address || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/30 transition-all font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-all font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Chat History Tab */}
            {activeTab === 'chats' && (
              <div className="space-y-3">
                {chatHistory.length === 0 ? (
                  <p className="text-center text-slate-400 py-8">No chat history yet</p>
                ) : (
                  chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-white font-medium truncate">
                            {chat.title || 'Untitled Chat'}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">
                            {new Date(chat.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        {chat.is_favorite && (
                          <Heart className="w-4 h-4 text-red-400 fill-red-400 ml-2" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="space-y-3">
                {chatHistory.filter((c) => c.is_favorite).length === 0 ? (
                  <p className="text-center text-slate-400 py-8">No favorite sessions yet</p>
                ) : (
                  chatHistory
                    .filter((c) => c.is_favorite)
                    .map((chat) => (
                      <div
                        key={chat.id}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-white font-medium truncate">
                              {chat.title || 'Untitled Chat'}
                            </h4>
                            <p className="text-xs text-slate-400 mt-1">
                              {new Date(chat.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Heart className="w-4 h-4 text-red-400 fill-red-400 ml-2" />
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
