import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'common-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() public title: string = "";
  @Input() public path: Array<any> = [];
  @Input() public exchangeRate: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(route) {
    if(route.length != 0){
      this.router.navigate(route);
    }
  }
}
