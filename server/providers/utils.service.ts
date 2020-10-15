import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ResponseMessageDTO } from '../messages/dto/index';

@Injectable()
export class UtilsService implements OnModuleDestroy {

    private timerExchangeRate: ReturnType<typeof setTimeout>;
    public socket: Server = null;
    private logger: Logger = new Logger('UtilsService');

    constructor() {
        this.mock_update_exchange_rate();
    }

    mock_update_exchange_rate() {
        this.logger.log(`Exchange Rate Mock update`);
        this.timerExchangeRate = setInterval( ()=>{
            if(this.socket != null) {
                if(Object.keys(this.socket.sockets.connected).length != 0) {
                    this.socket.emit("exchange_rate", this.get_exchange_rate());
                }
            }
        },15000);
    }

    get_exchange_rate() : ResponseMessageDTO {
        this.logger.log(`Get Exchange Rate`);
        let response = new ResponseMessageDTO();
        response.exchange_rate = Math.floor(Math.random() * 10000) + 1;
        return response;
    }

    onModuleDestroy() {
        clearTimeout(this.timerExchangeRate);
    }
}
