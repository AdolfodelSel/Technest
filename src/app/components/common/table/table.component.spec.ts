import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TableComponent, priceCalculator, customColor } from 'src/app/components/index';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  let displayedColumns = ['confirmedDate', 'orderId', 'orderCode', 'transactionType', 'debit', 'credit', 'balance'];
  let columns = [
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
  let dataSource = [{ confirmed_date: "02/11/2020 14:25", order_id: 'RAWIAL', order_code: 'LJLLWJ', transaction_type: "Payment received", debit: 0, credit: 0.00040000, balance: 1.05040000 }];
  let currentExchangeRate = 5;
  let validTableData = [
    { confirmed_date: '02/11/2020 14:25', order_id: 'RAWIAL', order_code: 'LJLLWJ', transaction_type: 'Payment received', debit: 'BTC 0$ 0.00', credit: 'BTC 0.0004$ 0.00', balance: 'BTC 1.0504$ 5.25' }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      declarations: [ 
        TableComponent,
        customColor,
        priceCalculator
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should correctly show the configured headers', () => {
    component.displayedColumns = displayedColumns;
    component.columns = columns;
    fixture.detectChanges();
    let tableDom = document.querySelector('table');
    let tableHeaders = Array.from(
      tableDom.getElementsByClassName('mat-header-cell')
    );
    let headerClasses = [
      'mat-column-confirmedDate',
      'mat-column-orderId',
      'mat-column-orderCode',
      'mat-column-transactionType',
      'mat-column-debit',
      'mat-column-credit',
      'mat-column-balance'
    ];
    tableHeaders.forEach(header => {
      expect(
        headerClasses.some(item => header.classList.contains(item))
      ).toBeTruthy();
    });
  });

  it('should correctly show the data', () => {
    component.displayedColumns = displayedColumns;
    component.columns = columns;
    component.dataSource = dataSource;
    component.currentExchangeRate = currentExchangeRate;
    fixture.detectChanges();
    let tableDom = document.querySelector('table');
    let table = Array.from(
      tableDom.getElementsByClassName('mat-row')
    );
    table.forEach(item => {
      let confirmedDate = item
        .getElementsByClassName('mat-column-confirmedDate')
        .item(0).textContent;
      let orderId = item
        .getElementsByClassName('mat-column-orderId')
        .item(0).textContent;
      let orderCode = item
        .getElementsByClassName('mat-column-orderCode')
        .item(0).textContent;
      let transactionType = item
        .getElementsByClassName('mat-column-transactionType')
        .item(0).textContent;
      let debit = item
        .getElementsByClassName('mat-column-debit')
        .item(0).textContent;
      let credit = item
        .getElementsByClassName('mat-column-credit')
        .item(0).textContent;
      let balance = item
        .getElementsByClassName('mat-column-balance')
        .item(0).textContent;
      
      expect(validTableData).toContain(
        jasmine.objectContaining({
          confirmed_date: confirmedDate,
          order_id: orderId,
          order_code: orderCode,
          transaction_type: transactionType,
          debit: debit,
          credit: credit,
          balance: balance
        })
      );
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
