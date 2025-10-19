import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import HeroSection from '../HeroSection/HeroSection';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import ContactSection from '../ContactSection/ContactSection';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error loading products</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <HeroSection heroProducts={products.slice(0, 3)} />
      <FeaturesSection />
      
      <section className={styles.productsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Exclusive Products</h2>
            <Link to="/products" className={styles.seeAllBtn}>See All</Link>
          </div>

          <div className={styles.productsGrid}>
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending section removed as requested */}

      <ContactSection />

      {/* Footer moved to global component */}
    </div>
  );
};

export default HomePage;

