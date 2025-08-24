import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1, variant = null) => {
    const itemId = variant ? `${product.id}-${variant.id}` : product.id.toString();
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem = {
          id: itemId,
          productId: product.id,
          name: variant ? `${product.name} - ${variant.name}` : product.name,
          sku: variant ? variant.sku : product.sku,
          price: variant ? variant.price : (product.salePrice || product.price),
          image: product.image || product.images?.[0],
          quantity,
          variant: variant ? {
            id: variant.id,
            name: variant.name,
            sku: variant.sku
          } : null
        };
        
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      return removeItem(itemId);
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = async (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = (subtotal = getSubtotal()) => {
    return subtotal * 0.20; // 20% VAT
  };

  const getShipping = (subtotal = getSubtotal()) => {
    return subtotal > 100 ? 0 : 9.99; // Free shipping over €100
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    return subtotal + getTax(subtotal) + getShipping(subtotal);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const value = {
    items,
    isOpen,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getItemCount,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
