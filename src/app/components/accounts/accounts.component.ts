import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/index';
import { AccountItem } from 'src/app/models/index';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  title: string;
  path: Array<any>;
  displayedColumns: string[];
  columns: Object[];
  dataSource: Array<AccountItem>;
  exchangeRate: number;

  constructor(private messageService: MessageService) {
    this.title = "Accounts";
    this.path = [
      {name: "Home", route: ['/home']},
      {name: "/", route: []},
      {name: "Accounts", route: ['/home/accounts']}
    ];
    this.displayedColumns = ['accountName', 'category', 'tag', 'balance', 'availableBalance'];
    this.columns = [
      {
        name: "Account Name",
        value: "account_name",
        type: "accountName"
      },
      {
        name: "Category",
        value: "category",
        type: "category"
      },
      {
        name: "Tag",
        value: "tag",
        type: "tag"
      },
      {
        name: "Balance",
        value: "balance",
        type: "balance"
      },
      {
        name: "Available Balance",
        value: "available_balance",
        type: "availableBalance"
      },
  
    ];
    this.dataSource = [];
    this.exchangeRate = 0;
   }

  ngOnInit(): void {
    this.messageService.getExchangeRate().subscribe(msg => {
      this.exchangeRate = msg;
    });
    this.messageService.getAccountList().subscribe(msg => {
      this.dataSource = msg;
    });
    this.messageService.sendMessage('account_list', {});
  }
}