import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError('Unable to load products');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className={styles.centerBox}>Loading products...</div>;
  if (error) return <div className={styles.centerBox}>{error}</div>;

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>All Products</h1>
        </div>
        <div className={styles.productsGrid}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;


