import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <img src="/logo1.png" alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Padrón Único de Personas Beneficiarias</h2>
      </div>
      <div className={styles.footerContent}>
        <p className={styles.copyright}>
          © Gobierno del Estado de Nayarit 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
