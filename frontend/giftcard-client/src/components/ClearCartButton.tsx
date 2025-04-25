import { useCart } from '../context/CartContext';

export default function ClearCartButton() {
  const { clearCart } = useCart();

  return <button onClick={clearCart}>Clear Cart</button>;
}
