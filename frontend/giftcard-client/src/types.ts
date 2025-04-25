export type GiftCardOutline = {
    id: number;
    name: string;
    image: string;
  }; 
  export type GiftCardMap = Record<number, GiftCardOutline>;
  export type PurchaseRequest = {
    uuid: string;       // ✅ Unique per cart entry 
    cardId: number;
    email: string;
    amount: number;
  };
  
  export type PurchaseResponse = {
    code: string;
    cardName: string;
  };
  