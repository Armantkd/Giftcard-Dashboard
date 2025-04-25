import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

type GiftCard = {
  id: number;
  name: string;
  image: string;
};

type PurchaseRequest = {
  cardId: number;
  email: string;
  amount: number;
};

type PurchaseResponse = {
  code: string;
  cardName: string;
};

const giftCards: GiftCard[] = [
  { id: 1, name: 'Amazon', image: 'amazon.png' },
  { id: 2, name: 'Starbucks', image: 'starbucks.png' },
  { id: 3, name: 'Netflix', image: 'netflix.png' },
  { id: 4, name: 'Steam', image: 'steam.png' }
];
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
app.get('/api/cards', async (_, res) => {
  await sleep(1000); // Pause for 2000 milliseconds (2 seconds)
  const cardsObj = Object.fromEntries(giftCards.map(card => [card.id, card]));
  res.json(cardsObj);
});

app.post('/api/purchase', (req, res) => {
  const { cardId, email, amount } = req.body as PurchaseRequest;

  const card = giftCards.find((gc) => gc.id === cardId);
  if (!card) {
    res.status(400).json({ error: 'Card not found' });
    return;
  }

  if (!email || !amount) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  const code = `GC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  res.json({ code, cardName: card.name } as PurchaseResponse);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
