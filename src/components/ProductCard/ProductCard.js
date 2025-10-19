import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };


  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  // offers/discount removed per request

  return (
    <div 
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.title}
          className={styles.productImage}
        />

      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
        </div>

        <div className={styles.rating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <span 
                key={index} 
                className={`${styles.star} ${
                  index < Math.floor(product.rating.rate) ? styles.filled : ''
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className={styles.ratingCount}>({product.rating.count})</span>
        </div>

        <p className={styles.productDescription}>
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description
          }
        </p>

        <button 
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
        <Link to={`/product/${product.id}`} className={styles.detailsBtn}>
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

