import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WsResponse,
  } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AccountsService, UtilsService } from '../providers/index';
import { ValidationPipe, UsePipes } from '@nestjs/common';
import { RequestMessageDTO, ResponseMessageDTO } from './dto/index';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private logger: Logger = new Logger('MessagesGateway');

    constructor(private accountsService: AccountsService, private utilsService: UtilsService){ }

    public afterInit(server: Server): void {
        this.accountsService.socket = server;
        this.utilsService.socket = server;
        return this.logger.log('Init');
    }

    public handleDisconnect(client: Socket): void {
        return this.logger.log(`Client disconnected: ${client.id}`);
    }

    public handleConnection(client: Socket): void {
        return this.logger.log(`Client connected: ${client.id}`);
    }

    @UsePipes(new ValidationPipe())
    @SubscribeMessage('account_list')
    public handle_account_list(client: Socket, @MessageBody() request_body : RequestMessageDTO): WsResponse<ResponseMessageDTO> {
        this.logger.log(`Msg received: ${request_body}`);
        let response: ResponseMessageDTO = this.accountsService.get_account_list();
        return { event: 'account_list', data: response };
    }

    @UsePipes(new ValidationPipe())
    @SubscribeMessage('account_detail')
    public handle_account_detail(client: Socket, @MessageBody() request_body : RequestMessageDTO): WsResponse<ResponseMessageDTO> {
        this.logger.log(`Msg received: ${request_body}`);
        let response: ResponseMessageDTO = this.accountsService.get_account_detail(request_body);
        return { event: 'account_detail', data: response };
    }

    @UsePipes(new ValidationPipe())
    @SubscribeMessage('exchange_rate')
    public handle_exchange_rate(client: Socket, @MessageBody() request_body : RequestMessageDTO): WsResponse<ResponseMessageDTO> {
        this.logger.log(`Msg received: ${request_body}`);
        let response: ResponseMessageDTO = this.utilsService.get_exchange_rate();
        return { event: 'exchange_rate', data: response };
    }
}