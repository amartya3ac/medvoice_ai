"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Menu,
  X,
  User as UserIcon,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { logout } from "@/app/login/actions";
import ProfileDashboard from "@/components/chatbot/ProfileDashboard";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Initial user fetch
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    // Auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/chatbot", label: "AI Assistant" },
  ];

  // Show compact profile icon on chatbot page
  if (pathname === "/chatbot") {
    return (
      <>
        {!loading && user && (
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setProfileOpen(true)}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:scale-110"
              title="Profile"
            >
              <UserIcon className="w-6 h-6 text-blue-400" />
            </button>
          </div>
        )}
        <ProfileDashboard
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
          user={user}
        />
      </>
    );
  }

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? "glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.15)] py-1"
            : "bg-transparent border-transparent py-3"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-blue-500/15 p-2 rounded-xl group-hover:bg-blue-500/25 transition-all duration-300">
                <Activity className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
                MedVoice AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-blue-400 ${
                    pathname === link.href
                      ? "text-blue-400"
                      : "text-slate-400 hover:-translate-y-0.5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {!loading && (
                <>
                  {user ? (
                    <button
                      onClick={() => setProfileOpen(true)}
                      className="hidden md:flex items-center gap-4 group hover:opacity-80 transition-opacity"
                    >
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 leading-none mb-0.5">
                          Patient
                        </span>
                        <span className="text-xs font-bold text-slate-300 truncate max-w-[120px]">
                          {user.email?.split("@")[0]}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-all duration-300 shadow-lg cursor-pointer">
                        <UserIcon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                      </div>
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="hidden md:inline-block text-sm font-bold text-slate-400 hover:text-white transition-colors px-2"
                    >
                      Login
                    </Link>
                  )}
                </>
              )}

              <Link
                href="/chatbot"
                className="btn-primary text-sm px-6 py-2.5 hidden lg:inline-flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
              >
                {user ? "Launch AI" : "Get Started"}
                <ChevronRight className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 glass-card bg-slate-900/95 rounded-2xl p-6 space-y-2 shadow-2xl border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/chatbot"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center btn-primary py-3 text-base"
              >
                Start Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Profile Dashboard Modal */}
      <ProfileDashboard
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
      />
    </>
  );
}
