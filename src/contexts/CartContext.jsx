import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../lib/supabase';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          setLoading(true);
          const cartItems = await db.getCartItems(user.id);
          setItems(cartItems.map(item => ({
            ...item.products,
            quantity: item.quantity,
            cartItemId: item.id
          })));
        } catch (error) {
          console.error('Error loading cart:', error);
          // Fallback to localStorage for guests
          const savedCart = localStorage.getItem("pipesan_cart");
          if (savedCart) {
            setItems(JSON.parse(savedCart));
          }
        } finally {
          setLoading(false);
        }
      } else {
        // Load from localStorage for guests
        const savedCart = localStorage.getItem("pipesan_cart");
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      }
    };

    loadCart();
  }, [user]);

  useEffect(() => {
    // Save to localStorage for guests
    if (!user) {
      localStorage.setItem("pipesan_cart", JSON.stringify(items));
    }
 }, [items]);

   const addItem = async (product, quantity = 1) => {
    try {
      if (user) {
        // Add to database for authenticated users
        await db.addToCart(user.id, product.id, quantity);
        
        // Update local state
        setItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id);
          
          if (existingItem) {
            return prevItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          
          return [...prevItems, { ...product, quantity }];
        });
      } else {
        // Add to localStorage for guests
        setItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id);
          
          if (existingItem) {
            return prevItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          
          return [...prevItems, { ...product, quantity }];
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
 };

   const removeItem = async (productId) => {
    try {
      if (user) {
        await db.removeFromCart(user.id, productId);
      }
      
      setItems(prevItems => prevItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
 };

   const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }
      
      if (user) {
        await db.updateCartItem(user.id, productId, quantity);
      }
      
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      throw error;
    }
 };

   const clearCart = async () => {
    try {
      if (user) {
        await db.clearCart(user.id);
      }
      
      setItems([]);
      
      if (!user) {
        localStorage.removeItem("pipesan_cart");
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
 };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
     loading,
   addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
