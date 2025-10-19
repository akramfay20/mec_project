import React from 'react';
import styles from './Footer.module.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className={styles.footerWrap}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <div className={styles.logoBox}>S</div>
              <div className={styles.brandName}>Shopwise</div>
            </div>
            <p className={styles.brandDesc}>
              Shopwise empowers shoppers to discover quality products and make smarter purchases — making shopping easier to share, understand, and act on.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="X" className={styles.socialBtn}><FaXTwitter /></a>
              <a href="#" aria-label="Instagram" className={styles.socialBtn}><FaInstagram /></a>
              <a href="#" aria-label="Facebook" className={styles.socialBtn}><FaFacebookF /></a>
            </div>
            <div className={styles.copyMobile}>© 2025 Shopwise. All rights reserved.</div>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.linkGroup}>
              <div className={styles.groupTitle}>Product</div>
              <a href="#" className={styles.link}>Features</a>
              <a href="#" className={styles.link}>Pricing</a>
              <a href="#" className={styles.link}>Integrations</a>
              <a href="#" className={styles.link}>Changelog</a>
            </div>
            <div className={styles.linkGroup}>
              <div className={styles.groupTitle}>Resources</div>
              <a href="#" className={styles.link}>Documentation</a>
              <a href="#" className={styles.link}>Tutorials</a>
              <a href="#" className={styles.link}>Blog</a>
              <a href="#" className={styles.link}>Support</a>
            </div>
            <div className={styles.linkGroup}>
              <div className={styles.groupTitle}>Company</div>
              <a href="#" className={styles.link}>About</a>
              <a href="#" className={styles.link}>Careers</a>
              <a href="#" className={styles.link}>Contact</a>
              <a href="#" className={styles.link}>Partners</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.copy}>© 2025 Shopwise. All rights reserved.</div>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
            <a href="#" className={styles.legalLink}>Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


