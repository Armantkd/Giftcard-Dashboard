import { createContext, useContext, useState, ReactNode } from 'react';
import { PurchaseRequest } from '../types';
import { v4 as uuidv4 } from 'uuid';
import CartModal from '../components/CartModal';

type CartContextType = {
    cart: PurchaseRequest[];
    addToCart: (item: Omit<PurchaseRequest, 'uuid'>) => void;
    clearCart: () => void;
    removeFromCart: (req: PurchaseRequest) => void;
};



const CartContext = createContext<CartContextType | undefined>(undefined);


export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<PurchaseRequest[]>([]);
    const addToCart = (item: Omit<PurchaseRequest, 'uuid'>) => {
        const newItem = { ...item, uuid: uuidv4() };
        setCart((prev) => [...prev, newItem]);
      };

    const removeFromCart = (req: PurchaseRequest) => {
        setCart(cart.filter((card) => card.uuid !== req.uuid));
    }

    const clearCart = () => {
        setCart([]);
    };
    
    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart }}>
        {children}
        </CartContext.Provider>
    );

}


export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  }