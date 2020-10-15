import { Component, Input, OnInit, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'common-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() public displayedColumns: string[] = [];
  @Input() public columns: Object[] = [];
  @Input() public exchangeRate: Number = 0;
  @Input() private data: Array<any> = [];

  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;

  previusExchangeRate: Number;
  currentExchangeRate: Number;
  previusDataSource: Array<any>;
  dataSource;

  constructor(private router: Router) {
    this.previusExchangeRate = 0;
    this.currentExchangeRate = 0;
    this.previusDataSource = [];
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    this.previusDataSource = this.data;
    this.dataSource.data = this.data;
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["exchangeRate"]){
      if (changes["exchangeRate"]["previousValue"] == 0) {
        this.previusExchangeRate = changes["exchangeRate"]["currentValue"];
      }else{
        this.previusExchangeRate = changes["exchangeRate"]["previousValue"];
      }
      this.currentExchangeRate = changes["exchangeRate"]["currentValue"];
    }
    if(changes["data"]){
      if(changes["data"]["previousValue"] != undefined){
        if (changes["data"]["previousValue"].length == 0) {
          this.previusDataSource = changes["data"]["currentValue"];
        }else{
          this.previusDataSource = changes["data"]["previousValue"];
        }
      }else{
        this.previusDataSource = changes["data"]["currentValue"];
      }
      this.dataSource.data = changes["data"]["currentValue"];
    }
  }

  animationEnd(e: Event) {
    e["target"]["classList"].remove('active');
  }

  goToAccountDetails(id) {
    this.router.navigate(['/home/account', id]);
  }
}
