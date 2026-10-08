import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "../data/menuData";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  quantity: number;
  item: MenuItem; // Full reference
}

interface OrderContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, qty?: number) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getItemQuantity: (id: string) => number;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  modalItem: MenuItem | null;
  openModal: (item: MenuItem) => void;
  closeModal: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "eddys_restaurant_cart_v2";

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage error
    }
  }, [cart]);

  const addToCart = (item: MenuItem, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + qty } : ci
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: qty,
          item,
        },
      ];
    });
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((ci) => (ci.id === id ? { ...ci, quantity: ci.quantity + 1 } : ci))
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.id === id) {
            const nextQty = ci.quantity - 1;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (id: string): number => {
    const found = cart.find((ci) => ci.id === id);
    return found ? found.quantity : 0;
  };

  const getCartTotal = (): number => {
    return cart.reduce((acc, ci) => acc + ci.price * ci.quantity, 0);
  };

  const getCartItemCount = (): number => {
    return cart.reduce((acc, ci) => acc + ci.quantity, 0);
  };

  const cartTotal = getCartTotal();
  const cartCount = getCartItemCount();

  const openModal = (item: MenuItem) => setModalItem(item);
  const closeModal = () => setModalItem(null);

  return (
    <OrderContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
        getItemQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        modalItem,
        openModal,
        closeModal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
