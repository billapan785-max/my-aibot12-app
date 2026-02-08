
export enum OrderStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface BotProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  type: 'MT4' | 'MT5';
  winRate: string;
}

export interface Order {
  id: string;
  botId: string;
  userEmail: string;
  userName: string;
  status: OrderStatus;
  binanceTxId: string;
  createdAt: number;
}
