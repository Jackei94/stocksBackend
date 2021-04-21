import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IStocksService } from '../primary-ports/stocks.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Stocks } from '../../infrastructure/stocks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StocksService implements IStocksService{
  allStocks: string[] = [];

  constructor(
    @InjectRepository(Stocks)
    private stocksRepository: Repository<Stocks>
  ) {}

  getAllStocks() {
    return this.stocksRepository.find();
  }

  async getStocksById(id: number) {
    const stocks = await this.stocksRepository.findOne(id);
    if (stocks) {
      return stocks;
    }
    throw new HttpException('Stocks not found', HttpStatus.NOT_FOUND);
  }

  async createStocks(stock: Stocks) {
    const newStocks = await this.stocksRepository.create(stock);
    await this.stocksRepository.save(newStocks);
    return newStocks;
  }

  async updateStocks(stocks: Stocks): Promise<Stocks> {
    await this.stocksRepository.update(stocks.id, stocks);
    const updateStocks = await this.stocksRepository.findOne(stocks.id);
    if (updateStocks) {
      return updateStocks
    }
    throw new HttpException('Stocks not found', HttpStatus.NOT_FOUND);
  }
}
