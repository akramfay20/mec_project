import React, { useEffect, useMemo, useState } from 'react';
import styles from './HeroSection.module.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ heroProducts = [] }) => {
  const navigate = useNavigate();
  const slides = useMemo(() => heroProducts.slice(0, 3), [heroProducts]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) {
    return null;
  }

  const current = slides[active];

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.carousel}>
          {slides.map((p, idx) => (
            <div 
              key={p.id}
              className={`${styles.slide} ${idx === active ? styles.active : ''}`}
              aria-hidden={idx !== active}
            >
              <div className={styles.heroContent}>
                <div className={styles.heroText}>
                  {/* <h3 className={styles.subtitle}>{p.category}</h3> */}
                  <h1 className={styles.title}>{p.title}</h1>
                  <p className={styles.desc}>
                    {p.description?.length > 140 ? `${p.description.slice(0, 140)}...` : p.description}
                  </p>
                  <div className={styles.heroCtaRow}>
                    <button 
                      className={styles.shopNowBtn}
                      onClick={() => {
                        navigate('/products');
                      }}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
                <div className={styles.heroImage}>
                  <img src={p.image} alt={p.title} className={styles.heroProductImage} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === active ? styles.dotActive : ''}`}
              onClick={() => setActive(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

