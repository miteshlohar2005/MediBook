"use client";
import React, { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { C } from "../../../components/PastChecksList";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Patient"); // Default static role
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Wait for auth to initialize or use auth.currentUser if already loaded
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        setName(u.displayName || "");
        setEmail(u.email || "");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    setMessage("");
    try {
      await updateProfile(user, { displayName: name });
      setMessage("Profile updated successfully!");
    } catch (error: any) {
      setMessage("Failed to update profile: " + error.message);
    }
    setIsSaving(false);
  };

  if (!user) return null; // Let the layout handle the loading state

  const initials = name ? name[0].toUpperCase() : email ? email[0].toUpperCase() : "?";

  return (
    <div className="a1" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: C.text, letterSpacing: "-0.02em", marginBottom: 24 }}>
        My Profile
      </h1>

      <div style={{ background: "var(--c-bg-card)", borderRadius: 18, padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: `1px solid rgba(46,125,138,0.07)` }}>
        
        {/* Avatar Section */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${C.rose}, ${C.roseDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: "#fff", boxShadow: "0 4px 12px rgba(212,165,165,0.3)" }}>
            {initials}
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: C.text, marginBottom: 4 }}>{name || "User"}</h2>
            <p style={{ fontSize: 14, color: C.textLight }}>{role}</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.textLight, marginBottom: 6 }}>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid var(--c-border-subtle-heavy)", outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: C.text, transition: "border-color 0.2s" }}
              onFocus={(e) => e.target.style.borderColor = C.teal}
              onBlur={(e) => e.target.style.borderColor = "var(--c-border-subtle-heavy)"}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.textLight, marginBottom: 6 }}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              disabled
              style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.05)", background: "rgba(0,0,0,0.02)", outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: C.textLight, cursor: "not-allowed" }}
            />
            <p style={{ fontSize: 11, color: C.textLight, marginTop: 6 }}>Email address cannot be changed here.</p>
          </div>
          
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.textLight, marginBottom: 6 }}>Role</label>
            <input 
              type="text" 
              value={role} 
              disabled
              style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.05)", background: "rgba(0,0,0,0.02)", outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: C.textLight, cursor: "not-allowed" }}
            />
          </div>

          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 16 }}>
            <button type="submit" disabled={isSaving} className="btn-main" style={{ opacity: isSaving ? 0.7 : 1 }}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            {message && (
              <span style={{ fontSize: 13, color: message.includes("success") ? C.teal : C.roseDark, fontWeight: 500 }}>
                {message}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
