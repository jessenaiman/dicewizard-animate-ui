"use client";
import React from "react";
import AnimateUIIcon from "@workspace/ui/components/icons/animateui-icon";
import ReactIcon from "@workspace/ui/components/icons/react-icon";
import TSIcon from "@workspace/ui/components/icons/ts-icon";
import { Star } from "@/registry/icons/star";
import { Moon } from "@/registry/icons/moon";
import { Sun } from "@/registry/icons/sun";

export default function PortfolioIcons() {
  const size = 28;
  return (
    <div style={{ display: "grid", gap: 16 }} data-slot="portfolio-icons">
      <p>Icons integrated from both the UI package and the new animated registry icons:</p>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <AnimateUIIcon width={size} height={size} />
        <ReactIcon width={size} height={size} />
        <TSIcon width={size} height={size} />
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Star size={size} animateOnHover />
        <Moon size={size} animateOnHover />
        <Sun size={size} animateOnHover />
      </div>
      <p style={{ opacity: 0.8 }}>
        Tip: Use the `animateOnHover` prop and default spring settings (stiffness: 150, damping: 22).
      </p>
    </div>
  );
}

