import { useState } from 'react';
import { GiftCardOutline } from '../types';
import { useCart } from '../context/CartContext';
type Props = {
  card: GiftCardOutline;
};

export default function GiftCard({ card }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(10);
  const [resultMsg, setResultMsg] = useState('');
  const { cart, addToCart } = useCart();

  const wrap = () =>{
    const isValidEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (email.length === 0){
      setResultMsg("Empty Email Address! Please enter email")
      return;
    }
    else if (!isValidEmail(email)) {
      setResultMsg("Invalid Email Address!")
      return;
    }
    addToCart({cardId: card.id, amount, email});
    setResultMsg("Added to cart!")
  }
  return (
    <div className="card">
      <h3>{card.name}</h3>
      <img src={`/images/${card.image}`} width={100} />
      <button onClick={() => setShowForm(true)}>Buy</button>

      {showForm && (
        <div className="form-area">
          <input
            type="email"
            placeholder="Recipient Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          >
            <option value={10}>$10</option>
            <option value={25}>$25</option>
            <option value={50}>$50</option>
          </select>
          <button onClick={wrap}>Add to cart</button>
          <p style={{ color: 'black' }}>{resultMsg}</p>
        </div>
      )}
    </div>
  );
}
