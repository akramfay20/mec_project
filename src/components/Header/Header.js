import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartDropdown from '../Cart/CartDropdown';
import styles from './Header.module.css';
import { FaCartPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { getTotalItems, isOpen, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleCartClick = () => {
    toggleCart();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToContact = () => {
    const doScroll = () => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 100);
    } else {
      doScroll();
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Main Navigation */}
        <nav className={styles.navBar}>
          <div className={styles.navContainer}>
            {/* Logo */}
            <div className={styles.logo}>
              <span className={styles.logoText}>Shopwise</span>
            </div>

            {/* Desktop Navigation */}
            <div className={styles.navMenu}>
              <NavLink 
                to="/" 
                className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/products" 
                className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </NavLink>
              <button className={styles.navLink} onClick={scrollToContact}>Contact</button>
            </div>

            {/* Right Side Icons */}
            <div className={styles.navRight}>
              <button className={styles.searchBtn}>
                <FaSearch size={24} />
              </button>
              <button className={styles.cartBtn} onClick={handleCartClick}>
                <FaCartPlus size={24} />
                {getTotalItems() > 0 && (
                  <span className={styles.cartBadge}>{getTotalItems()}</span>
                )}
              </button>
              {!isAuthenticated ? (
                <NavLink 
                  to="/login" 
                  className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              ) : (
                <button className={styles.navLink} onClick={logout}>
                  Logout {user?.username ? `(${user.username})` : ''}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
              <MdMenuOpen size={26} />
            </button>
          </div>

          {/* Mobile Drawer Menu */}
          <div 
            className={`${styles.drawerOverlay} ${isMenuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
          />
          <aside className={`${styles.drawer} ${isMenuOpen ? styles.open : ''}`} aria-hidden={!isMenuOpen}>
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Menu</span>
              <button aria-label="Close" className={styles.drawerClose} onClick={toggleMenu}>
                <MdClose size={24} />
              </button>
            </div>
            <nav className={styles.drawerLinks}>
              <NavLink 
                to="/" 
                className={styles.drawerLink}
                onClick={() => setIsMenuOpen(false)}
              >Home</NavLink>
              <NavLink 
                to="/products"
                className={styles.drawerLink}
                onClick={() => setIsMenuOpen(false)}
              >Products</NavLink>
              <button className={styles.drawerLink} onClick={scrollToContact}>Contact</button>
              {!isAuthenticated ? (
                <NavLink 
                  to="/login" 
                  className={`${styles.drawerLink} ${styles.drawerLogin}`}
                  onClick={() => setIsMenuOpen(false)}
                >Login</NavLink>
              ) : (
                <button className={`${styles.drawerLink} ${styles.drawerLogin}`} onClick={() => { logout(); setIsMenuOpen(false); }}>Logout {user?.username ? `(${user.username})` : ''}</button>
              )}
            </nav>
          </aside>
        </nav>
      </header>

      {/* Cart Dropdown */}
      {isOpen && <CartDropdown />}
    </>
  );
};

export default Header;
