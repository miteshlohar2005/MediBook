"use client";
import React from "react";
import { C, PastChecksList } from "../../../components/PastChecksList";
import { FadeIn } from "../../../components/animations/FadeIn";

export default function PastChecksPage() {
  return (
    <FadeIn delay={0.1}>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: C.text, letterSpacing: "-0.02em", marginBottom: 24 }}>
        Past Medication Checks
      </h1>
      
      <div style={{ background: "var(--c-bg-card)", borderRadius: 18, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: `1px solid rgba(46,125,138,0.07)` }}>
        <PastChecksList />
      </div>
    </FadeIn>
  );
}
