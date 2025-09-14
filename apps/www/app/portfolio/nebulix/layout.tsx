"use client";
import React from "react";
import styles from "./nebulix.module.css";

export default function NebulixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.nebulix} data-slot="nebulix-layout">
      <header className={styles.header}>
        <h1 className={styles.title}>Nebulix Dice Wizard</h1>
      </header>
      <article className={styles.article}>{children}</article>
    </section>
  );
}

