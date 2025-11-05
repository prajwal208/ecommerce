"use client"
import React, { useState } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import styles from './cart.module.scss';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Grunge Blue Bootcut',
      size: '36',
      color: 'Blue',
      quantity: 1,
      price: 1689,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Grunge Blue Bootcut',
      size: '34',
      color: 'Blue',
      quantity: 2,
      price: 1689,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop'
    }
  ]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const bagTotal = calculateTotal();
  const couponDiscount = 0;
  const grandTotal = bagTotal - couponDiscount;

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartContainer}>
        
        {/* Cart Items Section */}
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              
              {/* Product Image */}
              <div className={styles.itemImage}>
                <img 
                  src={item.image} 
                  alt={item.name}
                />
              </div>

              {/* Product Details */}
              <div className={styles.itemDetails}>
                <div>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className={styles.removeBtn}
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className={styles.itemMeta}>
                    <span>{item.size} | {item.color}</span>
                    <span className={styles.quantitySelector}>
                      QTY | 
                      <select 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </span>
                  </div>
                </div>

                <div className={styles.itemFooter}>
                  <button className={styles.wishlistBtn}>
                    MOVE TO WISHLIST
                  </button>
                  <span className={styles.itemPrice}>₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Details Section */}
        <div className={styles.priceDetails}>
          <div className={styles.priceHeader}>
            <h2>Price Details</h2>
          </div>

          <div className={styles.priceContent}>
            <div className={styles.priceRow}>
              <span>Bag Total</span>
              <span className={styles.priceValue}>₹{bagTotal}</span>
            </div>

            <div className={styles.priceRow}>
              <span>Shipping</span>
              <span className={styles.priceValue}>₹{0}</span>
            </div>

            <div className={styles.grandTotalRow}>
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>

            <button className={styles.payBtn}>
              PAY ₹ {grandTotal}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;