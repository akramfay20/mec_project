import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.username.trim()) next.username = 'Username is required';
    if (!form.password.trim()) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate request
    setTimeout(() => {
      const payload = { username: form.username };
      console.log('Login payload:', { username: form.username, password: form.password });
      login(payload);
      navigate('/');
    }, 600);
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={onChange}
                className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                placeholder="Enter your username"
              />
              {errors.username && <span className={styles.error}>{errors.username}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={onChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>
            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;



