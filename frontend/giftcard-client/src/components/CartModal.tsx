import { useCart } from '../context/CartContext';
import ClearCartButton from './ClearCartButton'
import { GiftCardOutline, GiftCardMap} from '../types'; // make sure this import exists

type Props = {
    cards: GiftCardMap;
  };


export default function CartModal({ cards }: Props) {
    const { cart, removeFromCart } = useCart();
    let sum = 0
    cart.forEach((e) => sum += e.amount)
    return (
        <div className="cart-modal">
        <h2 style={{ color: 'black' }}> Cart </h2>
        {cart.length > 0 &&
        <ul>
        {cart.map((e) =>(<li key={e.uuid}> {/* use uuid instead of cardId for uniqueness */}
          <div className="cart-item">
            <p className="cart-text"><strong>Card Name:</strong> {cards[e.cardId].name}</p>
            <p className="cart-text"><strong>Email:</strong> {e.email}</p>
            <p className="cart-text"><strong>Amount:</strong> ${e.amount}</p>
            <button className="remove-btn" onClick={() => removeFromCart(e)}>Remove</button>
          </div>
        </li>
            ))}
      </ul>}
        <div className="cart-footer">
      <p className="total">Total: ${sum}</p>
      { cart.length > 0 &&
            <ClearCartButton/> 
        }

  </div>
        
      </div>
      
    );
  }