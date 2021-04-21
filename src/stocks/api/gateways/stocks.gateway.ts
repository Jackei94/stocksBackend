import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StocksService } from '../../core/services/stocks.service';
import { IStocksService, IStocksServiceProvider } from '../../core/primary-ports/stocks.service.interface';
import { Inject } from '@nestjs/common';
import { StocksModel } from '../../core/models/stocks.model';
import { Socket } from 'socket.io';
import {Stocks} from "../../infrastructure/stocks.entity";

@WebSocketGateway()
export class StocksGateway {
  constructor(@Inject(IStocksServiceProvider) private stocksService: IStocksService) {}

  @WebSocketServer() server;
  @SubscribeMessage('getAllStocks')
  async getAllStocks(@ConnectedSocket() client: Socket) {
    let stocks: StocksModel[] = await this.stocksService.getAllStocks();
    client.emit('listenForAllStocks', stocks);
  }

  @SubscribeMessage('updateStocks')
  async updateStocks(
      @MessageBody() stock: Stocks,
      @ConnectedSocket() client: Socket) {
    await this.stocksService.updateStocks(stock);
  }

}
