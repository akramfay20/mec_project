import React, { useState } from 'react';
import styles from './ContactSection.module.css';
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = { ...form, submittedAt: new Date().toISOString() };
    console.log('Contact form submission:', payload);
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftPanel}>
            <h2 className={styles.leftTitle}>Contact Us <span className={styles.arrow}>↗</span></h2>
            <p className={styles.leftDesc}>Have a question or need assistance? Reach out to our dedicated support team. We're here to help with any inquiries you may have.</p>
            <ul className={styles.achievements}>
              <li><span className={styles.check}>✓</span> Personalized assistance</li>
              <li><span className={styles.check}>✓</span> Timely response</li>
              <li><span className={styles.check}>✓</span> Comprehensive support</li>
            </ul>
            <div className={styles.socials}>
              <a href="#" aria-label="X" className={styles.socialBtn}><FaXTwitter /></a>
              <a href="#" aria-label="Facebook" className={styles.socialBtn}><FaFacebookF /></a>
              <a href="#" aria-label="Instagram" className={styles.socialBtn}><FaInstagram /></a>
            </div>
          </div>

          <form className={styles.formCard} onSubmit={onSubmit}>
            <div className={styles.row2}>
              <div className={styles.fieldInline}>
                <label className={styles.srOnly} htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className={`${styles.inputDark} ${errors.name ? styles.inputError : ''}`}
                  placeholder="Name"
                />
                {errors.name && <span className={styles.errorSmall}>{errors.name}</span>}
              </div>
              <div className={styles.fieldInline}>
                <label className={styles.srOnly} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className={`${styles.inputDark} ${errors.email ? styles.inputError : ''}`}
                  placeholder="Email"
                />
                {errors.email && <span className={styles.errorSmall}>{errors.email}</span>}
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.srOnly} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={onChange}
                className={`${styles.textareaDark} ${errors.message ? styles.inputError : ''}`}
                placeholder="Message"
              />
              {errors.message && <span className={styles.errorSmall}>{errors.message}</span>}
            </div>
            <button type="submit" className={styles.submitBar}>Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


