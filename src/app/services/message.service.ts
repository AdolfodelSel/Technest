import { Injectable, NgZone } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestMessage, ResponseMessage, AccountItem } from 'src/app/models/index';


@Injectable()
export class MessageService {

  private exchangeRate: BehaviorSubject<number>;
  private accountList: BehaviorSubject<Array<AccountItem>>;
  private accountDetail: BehaviorSubject<ResponseMessage>;

  constructor(private readonly ngZone: NgZone, private wsService: WebsocketService) {
    this.exchangeRate = new BehaviorSubject<number>(0);
    this.accountList = new BehaviorSubject<Array<AccountItem>>([]);
    this.accountDetail = new BehaviorSubject<ResponseMessage>({account_detail: {} as AccountItem, account_detail_list: []});
    this.setListeners();
  }
  
  sendMessage(eventName: string, eventValue: RequestMessage) {
    this.wsService.emit(eventName, eventValue);
  }

  setListeners() {
    let _this = this;
    this.wsService.on('exchange_rate').subscribe((response:ResponseMessage) => {
        this.ngZone.run(() =>{
          if(response["exchange_rate"] != undefined){
            _this.exchangeRate.next(response["exchange_rate"]);
          }
      });
    });
    this.wsService.on('account_list').subscribe((response:ResponseMessage) => {
      this.ngZone.run(() =>{
        if(response["accounts"] != undefined){
          _this.accountList.next(response["accounts"]);
        }
      });
    });
    this.wsService.on('account_detail').subscribe((response:ResponseMessage) => {
      this.ngZone.run(() =>{
        if(response["account_detail"] != undefined && response["account_detail_list"] != undefined){
          _this.accountDetail.next(response);
        }
      });
    });
  }

  getExchangeRate(): Observable<any> {
    return this.exchangeRate.asObservable();
  }

  getAccountList(): Observable<any> {
    return this.accountList.asObservable();
  }

  getAccountDetail(): Observable<any> {
    return this.accountDetail.asObservable();
  }

}
