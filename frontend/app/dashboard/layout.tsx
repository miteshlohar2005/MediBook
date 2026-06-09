"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../../lib/firebase";
import { C, css } from "../../components/PastChecksList";
import { ThemeToggle } from "../../components/ThemeToggle";
import { ScaleHover } from "../../components/animations/ScaleHover";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (!u) router.push("/login");
      else { setUser(u); setLoading(false); }
    });
    return () => unsub();
  }, [router]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} style={{ textAlign: "center" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ width: 40, height: 40, borderRadius: 10, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontFamily: "'DM Serif Display', serif" }}>Rx</span>
        </motion.div>
        <div style={{ fontSize: 14, color: C.textLight }}>Loading...</div>
      </motion.div>
    </div>
  );

  const firstName = user?.displayName?.split(" ")[0] || "there";

  const navItems = [
    { id: "dashboard", label: "My Dashboard", icon: "🏠", href: "/dashboard" },
    { id: "check", label: "Check Medications", icon: "🔬", href: "/checker" },
    { id: "past", label: "Past Checks", icon: "📋", href: "/dashboard/past-checks" },
    { id: "profile", label: "My Profile", icon: "👤", href: "/dashboard/profile" },
  ];

  return (
    <>
      <style>{css || ""}</style>
      <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column" }}>

        <motion.nav 
          initial={{ y: -62 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ background: "var(--c-bg-card)", borderBottom: `1px solid var(--c-border-subtle)`, padding: "0 32px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 8px rgba(0,0,0,0.04)", position: "relative", zIndex: 50 }}
        >
          <ScaleHover onClick={() => router.push("/dashboard")} className="cursor-pointer" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 12, fontFamily: "'DM Serif Display', serif" }}>Rx</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: 17, color: C.teal, fontFamily: "'DM Serif Display', serif" }}>CascadeRx</span>
          </ScaleHover>
          
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ThemeToggle />
            
            <ScaleHover>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.cream, borderRadius: 50, padding: "6px 14px 6px 8px" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.rose}, ${C.roseDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{firstName[0]?.toUpperCase()}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{user?.displayName || user?.email}</span>
              </div>
            </ScaleHover>

            <ScaleHover>
              <button onClick={async () => { await signOut(auth); router.push("/"); }} style={{ padding: "7px 16px", fontSize: 12, background: "transparent", border: `1px solid var(--c-border-subtle-heavy)`, borderRadius: 50, color: C.textLight, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Sign out</button>
            </ScaleHover>
          </div>
        </motion.nav>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <motion.aside 
            initial={{ x: -210 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: 210, background: "var(--c-bg-card)", borderRight: `1px solid var(--c-border-subtle)`, padding: "20px 14px", display: "flex", flexDirection: "column", gap: 3, flexShrink: 0, position: "relative", zIndex: 40 }}
          >
            {navItems.map((item, i) => (
              <motion.button 
                key={item.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className={`nav-item ${pathname === item.href || (item.id === "dashboard" && pathname === "/dashboard") ? "active" : ""}`} 
                onClick={() => router.push(item.href)}
              >
                <span>{item.icon}</span>{item.label}
              </motion.button>
            ))}
          </motion.aside>

          <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto", position: "relative" }}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
