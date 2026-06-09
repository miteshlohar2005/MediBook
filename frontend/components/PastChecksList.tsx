import React from 'react';

export const C = { cream: "var(--c-cream)", rose: "var(--c-rose)", teal: "var(--c-teal)", tealDark: "var(--c-teal-dark)", roseDark: "var(--c-rose-dark)", text: "var(--c-text)", textLight: "var(--c-text-light)", bgCard: "var(--c-bg-card)", borderSubtle: "var(--c-border-subtle)", borderSubtleHeavy: "var(--c-border-subtle-heavy)" };

export const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(212,165,165,0.5)}50%{box-shadow:0 0 0 8px rgba(212,165,165,0)}}
  .a1{animation:fadeUp 0.5s cubic-bezier(.16,1,.3,1) both}
  .a2{animation:fadeUp 0.5s 0.08s cubic-bezier(.16,1,.3,1) both}
  .a3{animation:fadeUp 0.5s 0.16s cubic-bezier(.16,1,.3,1) both}
  .a4{animation:fadeUp 0.5s 0.24s cubic-bezier(.16,1,.3,1) both}
  .nav-item{padding:10px 14px;border-radius:10px;border:none;background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;display:flex;align-items:center;gap:9px;width:100%;text-align:left;transition:all 0.15s;color:#666}
  .nav-item:hover{background:var(--c-border-subtle);color:${C.teal}}
  .nav-item.active{background:${C.teal}18;color:${C.teal};font-weight:600}
  .med-row{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:10px;border:1px solid var(--c-border-subtle);background:rgba(245,240,232,0.4);transition:all 0.2s}
  .med-row:hover{background:var(--c-bg-card);border-color:var(--c-border-subtle-heavy)}
  .history-row{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-radius:10px;background:rgba(245,240,232,0.4);border:1px solid var(--c-border-subtle);transition:all 0.2s}
  .history-row:hover{background:var(--c-bg-card);border-color:var(--c-border-subtle-heavy)}
  .history-row-clickable{cursor:pointer}
  .history-row-clickable:hover{transform:translateX(3px)}
  .btn-main{background:${C.teal};color:#fff;border:none;padding:13px 24px;border-radius:50px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.25s;display:inline-flex;align-items:center;gap:8px}
  .btn-main:hover{background:${C.tealDark};transform:translateY(-2px);box-shadow:0 8px 24px rgba(46,125,138,0.3)}
  .scrollbox{overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--c-border-subtle-heavy) transparent}
  .scrollbox::-webkit-scrollbar{width:4px}
  .scrollbox::-webkit-scrollbar-track{background:transparent}
  .scrollbox::-webkit-scrollbar-thumb{background:var(--c-border-subtle-heavy);border-radius:4px}
  .safety-card{transition: all 0.3s ease;}
  .safety-card:hover{transform: translateY(-3px); box-shadow: 0 15px 35px rgba(46, 125, 138, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.2) !important;}
`;

export const PAST_CHECKS = [
  { id: 1, date: "14 Mar 2026", drugs: "4 medications", risk: "CRITICAL", icon: "⚠", meds: ["Fluoxetine", "Metoprolol", "Celecoxib", "Metformin"] },
  { id: 2, date: "28 Feb 2026", drugs: "3 medications", risk: "SAFE", icon: "✓", meds: ["Aspirin", "Omeprazole", "Amlodipine"] },
  { id: 3, date: "10 Jan 2026", drugs: "2 medications", risk: "MODERATE", icon: "⚠", meds: ["Amlodipine", "Metformin"] },
];

export const RISK_COLOR: Record<string, { bg: string; color: string; border: string }> = {
  CRITICAL: { bg: "#FEE2E2", color: "#B91C1C", border: "#FCA5A5" },
  HIGH:     { bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
  MODERATE: { bg: "#FEF9C3", color: "#854D0E", border: "#FDE047" },
  SAFE:     { bg: "#DCFCE7", color: "#166534", border: "#86EFAC" },
};

export function RiskBadge({ risk }: { risk: string }) {
  const c = RISK_COLOR[risk] || RISK_COLOR.MODERATE;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: c.bg, color: c.color, border: `1px solid ${c.border}`, letterSpacing: "0.05em" }}>{risk}</span>
  );
}

import { StaggerContainer, StaggerItem } from "./animations/StaggerContainer";
import { ScaleHover } from "./animations/ScaleHover";

export function PastChecksList({ limit }: { limit?: number }) {
  const displayChecks = limit ? PAST_CHECKS.slice(0, limit) : PAST_CHECKS;
  
  return (
    <StaggerContainer className="scrollbox" style={{ maxHeight: limit ? 220 : '100%', display: "flex", flexDirection: "column", gap: 8 }}>
      {displayChecks.map(h => (
        <StaggerItem key={h.id}>
          <ScaleHover className="history-row" style={{ width: "100%", margin: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: h.risk === "SAFE" ? "#4CAF5015" : `${C.rose}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{h.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{h.drugs}</div>
                <div style={{ fontSize: 11, color: C.textLight }}>{h.date}</div>
              </div>
            </div>
            <RiskBadge risk={h.risk} />
          </ScaleHover>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
