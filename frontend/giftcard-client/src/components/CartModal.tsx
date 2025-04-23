import { useCart } from '../context/CartContext';
export default function CartModal() {
    const { cart } = useCart();
  
    return (
        <ul>
        {cart.map((e) => (
          <li key={e.cardId}>{e.cardId}</li>
        ))}
      </ul>
      
    );
  }