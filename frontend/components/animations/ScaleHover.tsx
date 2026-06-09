"use client";

import { motion } from "framer-motion";
import React from "react";

export function ScaleHover({ children, className, style, onClick }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
      style={{ cursor: onClick ? "pointer" : "default", ...style }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
