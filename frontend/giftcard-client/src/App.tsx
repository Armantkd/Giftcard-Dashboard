import { useEffect, useState } from 'react';
import { GiftCardOutline } from './types';
import GiftCard from './components/GiftCard';
import CartModal from './components/CartModal';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [cards, setCards] = useState<GiftCardOutline[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/cards')
      .then((res) => res.json())
      .then(data => {
        console.log("Fetched cards:", data);
        setCards(data);
      });
  }, []);
  return (
    <CartProvider>

    <div className = "flex">
    <CartModal/>
        <div className="card-list">
          {cards.length === 0 ? (
          <p>Loading gift cards...</p>
          ) : (
            cards.map((card) => <GiftCard key={card.id} card={card} />)
          )}
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
