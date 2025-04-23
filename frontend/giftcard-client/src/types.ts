export type GiftCard = {
    id: number;
    name: string;
    image: string;
  };
  
  export type PurchaseRequest = {
    cardId: number;
    email: string;
    amount: number;
  };
  
  export type PurchaseResponse = {
    code: string;
    cardName: string;
  };
  