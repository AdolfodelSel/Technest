import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.sendMessage('exchange_rate', {});
   }
}
