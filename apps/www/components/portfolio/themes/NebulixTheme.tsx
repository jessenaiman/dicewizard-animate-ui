import React from 'react';
import styles from './nebulix.module.css';

export function NebulixTheme({ children }: { children: React.ReactNode }) {
  return <section className={styles.nebulix}>{children}</section>;
}

