import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductDetailsPage.module.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const [pRes, sRes] = await Promise.all([
          fetch(`https://fakestoreapi.com/products/${id}`),
          fetch('https://fakestoreapi.com/products?limit=3')
        ]);
        
        if (!pRes.ok || !sRes.ok) throw new Error('Failed to fetch');
        
        const [pData, sData] = await Promise.all([pRes.json(), sRes.json()]);
        
        if (!isMounted) return;
        setProduct(pData);
        setSuggestedProducts(sData);
      } catch (e) {
        if (!isMounted) return;
        setError('Unable to load product details');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className={styles.centerBox}>Loading product...</div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.centerBox}>{error || 'Product not found'}</div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.imageBox}>
            <img src={product.image} alt={product.title} />
          </div>
          <div className={styles.infoBox}>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.price}>${product.price.toFixed(2)}</div>
            <div className={styles.meta}>Category: {product.category}</div>
            <p className={styles.desc}>{product.description}</p>
            <div className={styles.actions}>
              <button className={styles.addBtn} onClick={() => addToCart(product)}>Add to Cart</button>
              <Link to="/" className={styles.backLink}>Back to Home</Link>
            </div>
          </div>
        </div>
        
        {suggestedProducts.length > 0 && (
          <div className={styles.suggestSection}>
            <h2 className={styles.suggestTitle}>You May Also Like</h2>
            <div className={styles.suggestGrid}>
              {suggestedProducts.map((suggestedProduct) => (
                <ProductCard key={suggestedProduct.id} product={suggestedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;


