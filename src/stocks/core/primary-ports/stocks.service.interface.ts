import { Stocks } from '../../infrastructure/stocks.entity';

export const IStocksServiceProvider = 'IStocksServiceProvider';
export interface IStocksService {

  getAllStocks();

  getStocksById(id: number);

  createStocks(stock: Stocks);

  updateStocks(stocks: Stocks);
}
