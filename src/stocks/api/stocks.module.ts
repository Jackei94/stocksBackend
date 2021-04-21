import { Module } from '@nestjs/common';
import { StocksGateway } from './gateways/stocks.gateway';
import { StocksService } from '../core/services/stocks.service';
import { IStocksServiceProvider } from '../core/primary-ports/stocks.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stocks } from '../infrastructure/stocks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stocks])],
  providers: [
    StocksGateway, {
    provide: IStocksServiceProvider,
      useClass: StocksService,
    }
  ],
})
export class StocksModule {}
