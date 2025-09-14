"use client";
import React from "react";
import styles from "./essays.module.css";

export default function EssaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.cosmos} data-slot="essays-layout">
      <header className={styles.header}>
        <h1 className={styles.title}>Essays</h1>
        <p className={styles.subtitle}>Philosophy, life, and the deep unknown</p>
      </header>
      <article className={styles.article}>{children}</article>
    </section>
  );
}

