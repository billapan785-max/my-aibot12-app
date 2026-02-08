
import { BotProduct } from './types';

export const BINANCE_PAY_ID = "294812304"; // Dummy ID for demo
export const USDT_ADDRESS = "T9yD...xY2z (TRC20)";

export const BOTS: BotProduct[] = [
  {
    id: 'atlas-v1',
    name: 'Atlas AI Pro',
    price: 199,
    description: 'Our flagship AI bot specialized in XAUUSD (Gold) with advanced risk management.',
    features: ['85% Win Rate', 'Auto-Stop Loss', 'Daily 2-5% ROI', 'News Filter'],
    type: 'MT4',
    winRate: '85%'
  },
  {
    id: 'zenith-v2',
    name: 'Zenith Scalper',
    price: 349,
    description: 'High-frequency scalping bot for major forex pairs like EURUSD and GBPUSD.',
    features: ['MT5 Optimized', '0.5s Execution', 'Low Drawdown', 'Life-time Updates'],
    type: 'MT5',
    winRate: '92%'
  }
];
