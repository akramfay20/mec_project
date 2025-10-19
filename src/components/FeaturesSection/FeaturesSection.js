import React from 'react';
import styles from './FeaturesSection.module.css';

const FeaturesSection = () => {
  const features = [
    {
      image:
        'https://i.pinimg.com/736x/78/b6/17/78b617a033043e95496cdc6e9fdf51bd.jpg'
    },
    {
      image:
      'https://i.pinimg.com/1200x/bb/a9/fd/bba9fd7ae355d91582ac78fde31cbc53.jpg'
    },
    {
      image:
        'https://i.pinimg.com/736x/04/39/9d/04399da57d98291d35083a7789d733ad.jpg'
    },
    {
     image:
      'https://i.pinimg.com/736x/a2/76/41/a27641b9d121ae654a39639b67abc4db.jpg'
    }
  ];
  const labels = ['Free Delivery', 'Offers', 'Customer Support',  'Safe Payment'];

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Features</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureCard} ${styles.imageCard}`}
              style={{ backgroundImage: `url(${feature.image})` }}
            >
              <div className={styles.imageOverlay} />
              <div className={styles.imageLabel}>{labels[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

