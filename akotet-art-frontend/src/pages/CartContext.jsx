
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product_id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          product_id: product.id,
          title: product.title,
          price: product.price,
          quantity,
          image_url: product.image_url,
        },
      ];
    });
  };

  const updateQuantity = (product_id, quantity) => {
    if (quantity <= 0) {
      removeItem(product_id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product_id === product_id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (product_id) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== product_id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);