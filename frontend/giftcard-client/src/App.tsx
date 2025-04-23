import { useEffect, useState } from 'react';
import { GiftCard } from './types';
import GiftCardComponent from './components/GiftCard';
import './App.css';

function App() {
  const [cards, setCards] = useState<GiftCard[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/cards')
      .then((res) => res.json())
      .then(setCards);
  }, []);

  return (
    <div className="card-list">
      {cards.map((card) => (
        <GiftCardComponent key={card.id} card={card} />
      ))}
    </div>
  );
}

export default App;
