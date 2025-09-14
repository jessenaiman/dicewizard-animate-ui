"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/ui/button";
import styles from "../sandbox.module.css";
import { useSandbox } from "../sandbox-context";

export function ButtonTile() {
  const { playing, resetKey, buttonText } = useSandbox();

  return (
    <div className={styles.tile} data-slot="sandbox-tile">
      <div className={styles.tileHeader}>
        <h3 className="text-sm font-medium">Buttons Basics</h3>
        <Link className="text-xs text-primary hover:underline" href="/docs/components/animate/buttons">
          View details →
        </Link>
      </div>
      <motion.div
        key={resetKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 22 }}
        className="flex flex-wrap gap-3"
      >
        <Button data-slot="sandbox-button" variant="default">
          {buttonText}
        </Button>
        <Button data-slot="sandbox-button" variant="outline">
          {buttonText}
        </Button>
        <motion.div
          animate={playing ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 22, repeat: playing ? Infinity : 0, repeatType: "loop" }}
        >
          <Button data-slot="sandbox-button" variant="secondary">
            {buttonText}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
