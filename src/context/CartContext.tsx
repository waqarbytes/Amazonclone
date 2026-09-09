import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  savedForLater: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  removeFromSaved: (productId: string) => void;
  removeOrderedItems: (productIds: string[]) => void;
  subtotal: number;
  itemCount: number;
  lastAddedProduct: Product | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'amazon_rebuild_cart_v1';
const SAVED_STORAGE_KEY = 'amazon_rebuild_saved_for_later_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [savedForLater, setSavedForLater] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load saved-for-later from localStorage', e);
      return [];
    }
  });

  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);

  // Sync active cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  // Sync saved-for-later with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedForLater));
    } catch (e) {
      console.error('Failed to save saved-for-later to localStorage', e);
    }
  }, [savedForLater]);

  const addToCart = (product: Product, quantity: number = 1) => {
    const maxStock = product.stockCount || 15;
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const currentQty = prevItems[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, maxStock);
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      } else {
        const safeQty = Math.min(Math.max(1, quantity), maxStock);
        return [...prevItems, { product, quantity: safeQty }];
      }
    });
    setLastAddedProduct(product);

    // Auto-dismiss notification after 4 seconds
    setTimeout(() => {
      setLastAddedProduct(current => (current?.id === product.id ? null : current));
    }, 4000);
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.product.id === productId) {
          const maxStock = item.product.stockCount || 15;
          const safeQty = Math.min(Math.max(1, quantity), maxStock);
          return { ...item, quantity: safeQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const saveForLater = (productId: string) => {
    const itemToSave = items.find(i => i.product.id === productId);
    if (!itemToSave) return;
    setItems(prev => prev.filter(i => i.product.id !== productId));
    setSavedForLater(prev => {
      const exists = prev.some(i => i.product.id === productId);
      return exists ? prev : [itemToSave, ...prev];
    });
  };

  const moveToCart = (productId: string) => {
    const itemToMove = savedForLater.find(i => i.product.id === productId);
    if (!itemToMove) return;
    setSavedForLater(prev => prev.filter(i => i.product.id !== productId));
    addToCart(itemToMove.product, itemToMove.quantity);
  };

  const removeFromSaved = (productId: string) => {
    setSavedForLater(prev => prev.filter(i => i.product.id !== productId));
  };

  const removeOrderedItems = (productIds: string[]) => {
    setItems(prev => prev.filter(item => !productIds.includes(item.product.id)));
  };

  const dismissToast = () => {
    setLastAddedProduct(null);
  };

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        savedForLater,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        saveForLater,
        moveToCart,
        removeFromSaved,
        removeOrderedItems,
        subtotal,
        itemCount,
        lastAddedProduct,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
