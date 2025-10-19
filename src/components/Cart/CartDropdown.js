import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartDropdown.module.css';

const CartDropdown = () => {
  const { items, getTotalPrice, removeFromCart, toggleCart } = useCart();

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };


  const handleCheckout = () => {
    // In a real app, this would navigate to checkout page
    console.log('Navigate to checkout page');
    toggleCart();
  };

  return (
    <div className={styles.overlay} onClick={toggleCart}>
      <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Shopping Cart</h3>
          <button className={styles.closeBtn} onClick={toggleCart}>×</button>
        </div>
        
        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className={styles.items}>
                {items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <p className={styles.itemPrice}>
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button 
                      className={styles.removeBtn}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className={styles.subtotal}>
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className={styles.actions}>
                <button className={styles.checkoutBtn} onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;

