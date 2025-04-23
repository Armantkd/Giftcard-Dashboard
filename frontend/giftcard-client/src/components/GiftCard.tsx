import { useState } from 'react';
import { GiftCard } from '../types';

type Props = {
  card: GiftCard;
};

export default function GiftCardComponent({ card }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(10);
  const [resultMsg, setResultMsg] = useState('');

  const handlePurchase = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: card.id, email, amount }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setResultMsg(`✅ Code: ${data.code}`);
    } catch (err: any) {
      setResultMsg(`❌ ${err.message}`);
    }
  };

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
          <button onClick={handlePurchase}>Submit</button>
          <p>{resultMsg}</p>
        </div>
      )}
    </div>
  );
}
