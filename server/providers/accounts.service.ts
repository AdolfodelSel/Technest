import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ACCOUNTS, ACCOUNTDETAILS } from '../mocks/index';
import { ResponseMessageDTO } from '../messages/dto/index';

@Injectable()
export class AccountsService implements OnModuleDestroy {

    private timerAccountList: ReturnType<typeof setTimeout>;
    private accounts = ACCOUNTS;
    private accountsDetails = ACCOUNTDETAILS;
    public socket: Server = null;
    private logger: Logger = new Logger('AccountsService');

    constructor() {
        this.mock_update_account_list();
    }

    mock_update_account_list() {
        this.logger.log(`Account List Mock update`);
        let rand: number = Math.floor(Math.random() * (20 - 5 + 1) + 5);
        if(this.socket != null) {
            if(Object.keys(this.socket.sockets.connected).length != 0) {
                this.socket.emit("account_list", this.get_account_list());
            }
        }
        this.timerAccountList = setTimeout(this.mock_update_account_list.bind(this),rand * 1000);
    }

    get_account_list() : ResponseMessageDTO {
        this.logger.log(`Get Account List`);
        let response = new ResponseMessageDTO();
        response.accounts = this.accounts.map(item => {
            item.balance = parseFloat(Math.random().toFixed(8));
            item.available_balance = parseFloat(Math.random().toFixed(8));
            return item;    
        });
        return response;
    }

    get_account_detail(request_body) : ResponseMessageDTO {
        this.logger.log(`Get Account Detail`);
        let response = new ResponseMessageDTO();
        let item = this.accounts.find(item => item.id === request_body.account_id );
        let item_list = this.accountsDetails.find(item => item.id === request_body.account_id );
        if(item_list != undefined){
            response.account_detail = item;
            response.account_detail_list = item_list.details;
        }else{
            this.logger.log(`Get Account Detail: requested item doesn't exist`);
        }
        return response;
    }

    onModuleDestroy() {
        clearTimeout(this.timerAccountList);
    }
}
