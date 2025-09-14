import React from 'react';
import styles from './essays.module.css';

export function EssaysTheme({ children }: { children: React.ReactNode }) {
  return <section className={styles.cosmos}>{children}</section>;
}

