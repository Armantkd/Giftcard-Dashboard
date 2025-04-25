import { useEffect, useState } from 'react';
import { GiftCardMap } from './types';
import GiftCard from './components/GiftCard';
import CartModal from './components/CartModal';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [cards, setCards] = useState<GiftCardMap>({});

  useEffect(() => {
    let isMounted = true;
    let cancelled = false;
    let retryCount = 0;
  
    const fetchData = () => {
      if (cancelled) return;  // prevent retry if cleanup ran
  
      fetch('http://localhost:3000/api/cards')
        .then((res) => {
          if (!res.ok) throw new Error("Server error");
          return res.json();
        })
        .then((data) => {
          if (isMounted) setCards(data);
        })
        .catch(() => {
          if (cancelled) return;
          retryCount++;
          const retryDelay = Math.min(1000 * 2 ** retryCount, 30000);
          setTimeout(fetchData, retryDelay);
        });
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
      cancelled = true; 
    };
  }, []);
  
  
  return (
    <CartProvider>

    <div className = "flex">
    <CartModal cards = {cards}/>
        <div className="card-list">
          {Object.values(cards).length === 0  ? (
          <p>Loading gift cards...</p>
          ) : (
            Object.values(cards).map((card) => <GiftCard key={card.id} card={card} />)
          )}
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
