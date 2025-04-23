import { createContext, useContext, useState, ReactNode } from 'react';
import { PurchaseRequest } from '../types';


type CartContextType = {
    cart: PurchaseRequest[];
    addToCart: (item: PurchaseRequest) => void;
};


const CartContext = createContext<CartContextType | undefined>(undefined);


export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<PurchaseRequest[]>([]);
    const addToCart = (item: PurchaseRequest) => {
        setCart((prev) => [...prev, item]);
      };
    return (
        <CartContext.Provider value={{ cart, addToCart }}>
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