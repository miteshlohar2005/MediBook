"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../../lib/firebase";
import { C, PastChecksList } from "../../components/PastChecksList";
import { FadeIn } from "../../components/animations/FadeIn";
import { ScaleHover } from "../../components/animations/ScaleHover";
import { StaggerContainer, StaggerItem } from "../../components/animations/StaggerContainer";

const ALL_MEDS_LOG = [
  { name: "Metoprolol 50mg", doctor: "Dr. Shah — Cardiologist", date: "14 Mar 2026", risk: true },
  { name: "Fluoxetine 20mg", doctor: "Dr. Patel — Psychiatrist", date: "14 Mar 2026", risk: true },
  { name: "Celecoxib 200mg", doctor: "Dr. Kumar — Rheumatologist", date: "14 Mar 2026", risk: true },
  { name: "Metformin 500mg", doctor: "Dr. Rao — Endocrinologist", date: "14 Mar 2026", risk: false },
  { name: "Aspirin 75mg", doctor: "Dr. Shah — Cardiologist", date: "28 Feb 2026", risk: false },
  { name: "Omeprazole 20mg", doctor: "Dr. Mehta — Gastroenterologist", date: "28 Feb 2026", risk: false },
  { name: "Amlodipine 5mg", doctor: "Dr. Shah — Cardiologist", date: "10 Jan 2026", risk: false },
];

function RiskBadge({ risk }: { risk: string }) {
  const c = risk === "CRITICAL" ? { bg: "#FEE2E2", color: "#B91C1C", border: "#FCA5A5" } : { bg: "#DCFCE7", color: "#166534", border: "#86EFAC" };
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: c.bg, color: c.color, border: `1px solid ${c.border}`, letterSpacing: "0.05em" }}>{risk}</span>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (u) setUser(u);
    });
    return () => unsub();
  }, []);

  const firstName = user?.displayName?.split(" ")[0] || "there";

  return (
    <div>
      <FadeIn delay={0.1} style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: C.text, letterSpacing: "-0.02em", marginBottom: 4 }}>
          Welcome back, {firstName} 👋
        </h1>
        <p style={{ fontSize: 14, color: C.textLight }}>Let's check if your medications are working safely together.</p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <ScaleHover>
          <div style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, borderRadius: 18, padding: "24px 32px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#fff", marginBottom: 5 }}>Check your medications now</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>Get a full safety report in under 30 seconds.</p>
            </div>
            <button className="btn-main" style={{ background: "var(--c-bg-card)", color: C.teal }} onClick={() => router.push("/checker")}>🔬 Analyze My Medications</button>
          </div>
        </ScaleHover>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 20, alignItems: "stretch" }}>
        <FadeIn delay={0.2} style={{ display: "flex" }}>
          <div style={{ flex: 1, background: "var(--c-bg-card)", borderRadius: 18, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: `1px solid var(--c-border-subtle)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: C.text }}>Your Medications</h3>
              <span style={{ fontSize: 12, color: C.textLight, background: C.cream, borderRadius: 20, padding: "3px 10px" }}>{ALL_MEDS_LOG.length} total</span>
            </div>
            <StaggerContainer className="scrollbox" style={{ maxHeight: 280, display: "flex", flexDirection: "column", gap: 8 }}>
              {ALL_MEDS_LOG.map((m, i) => (
                <StaggerItem key={i} className="med-row">
                  <span style={{ fontSize: 18 }}>💊</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: C.textLight }}>{m.doctor}</div>
                  </div>
                  <RiskBadge risk={m.risk ? "CRITICAL" : "SAFE"} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        <FadeIn delay={0.25} style={{ display: "flex", flexDirection: "column" }}>
          <ScaleHover style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <motion.div 
              animate={{ boxShadow: [`0 12px 30px rgba(46, 125, 138, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.15)`, `0 12px 40px rgba(46, 125, 138, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.25)`] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              style={{ 
              background: `linear-gradient(135deg, rgba(46, 125, 138, 0.95), rgba(31, 95, 107, 0.9))`, 
              backdropFilter: "blur(10px)", borderRadius: 24, padding: "32px", 
              flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.rose, display: "inline-block", animation: "pulse-dot 1.5s infinite" }} />
                  <span style={{ fontSize: 25, color: "rgba(237, 171, 171, 0.8)", fontWeight: 900, letterSpacing: "0.1em" }}>SAFETY ALERT!</span>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, backdropFilter: "blur(5px)", border: "1px solid rgba(255,255,255,0.2)" }}>🧬</div>
              </div>

              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>
                Medication Interaction Detected
              </h2>

              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.95)", lineHeight: 1.7, marginBottom: 18 }}>
                <strong style={{ color: "#fff", fontWeight: 700 }}>2 of your medications</strong> are currently blocking the enzyme that clears Metoprolol — raising its levels dangerously.
              </p>

              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 24, fontStyle: "italic" }}>
                This interaction was cross-referenced from your current medication list and previous safety checks.
              </p>

              <div style={{ marginTop: "auto" }}>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/checker")} 
                  style={{ width: "100%", padding: "14px", fontSize: 13, fontWeight: 700, background: "var(--c-bg-card)", color: C.teal, border: "none", borderRadius: 14, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  Resolve Interaction →
                </motion.button>
              </div>
            </motion.div>
          </ScaleHover>
        </FadeIn>
      </div>

      <FadeIn delay={0.3} style={{ background: "var(--c-bg-card)", borderRadius: 18, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: `1px solid var(--c-border-subtle)`, marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: C.text }}>Past Medication Checks</h3>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => router.push("/dashboard/past-checks")} style={{ fontSize: 12, color: C.teal, background: "transparent", border: "none", cursor: "pointer", fontWeight: 500 }}>See all →</motion.button>
        </div>
        <PastChecksList limit={3} />
      </FadeIn>
    </div>
  );
}