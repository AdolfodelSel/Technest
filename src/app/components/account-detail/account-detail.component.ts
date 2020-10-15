import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MessageService } from 'src/app/services/index';
import { DetailItem, AccountItem } from 'src/app/models/index';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  title: string;
  path: Array<any>;
  displayedColumns: string[];
  columns: Object[];
  dataSource: Array<DetailItem>;
  exchangeRate: number;
  accountId: number;
  account: AccountItem;
  
  constructor(private messageService: MessageService, private route: ActivatedRoute) {
    this.title = "Detail";
    this.path = [
      {name: "Home", route: ['/home']},
      {name: "/", route: []},
      {name: "Accounts", route: ['/home/accounts']},
      {name: "/", route: []},
      {name: "Detail", route: []},
    ];
    this.displayedColumns = ['confirmedDate', 'orderId', 'orderCode', 'transactionType', 'debit', 'credit', 'balance'];
    this.columns = [
      {
        name: "Confirmed Date",
        value: "confirmed_date",
        type: "confirmedDate"
      },
      {
        name: "Order ID",
        value: "order_id",
        type: "orderId"
      },
      {
        name: "Order Code",
        value: "order_code",
        type: "orderCode"
      },
      {
        name: "Transaction Type",
        value: "transaction_type",
        type: "transactionType"
      },
      {
        name: "Debit",
        value: "debit",
        type: "debit"
      },
      {
        name: "Credit",
        value: "credit",
        type: "credit"
      },
      {
        name: "Balance",
        value: "balance",
        type: "balance"
      },
    ];
    this.dataSource = [];
    this.exchangeRate = 0;
    this.accountId = 0;
    this.account = {} as AccountItem;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.accountId = parseInt(params.get("accountId"));
      this.messageService.sendMessage('account_detail', {account_id: this.accountId});
    });
    this.messageService.getExchangeRate().subscribe(msg => {
      this.exchangeRate = msg;
    });
    this.messageService.getAccountDetail().subscribe(msg => {
      this.account = msg["account_detail"];
      this.dataSource = msg["account_detail_list"];
    });
  }
}
