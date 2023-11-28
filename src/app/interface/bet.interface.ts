export interface Bet {
  id: number;
  time: string;
  description?: string;
  userId?: number;
  user?: any;
  resultId: number;
}
