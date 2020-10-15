import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountDetailComponent, priceCalculator, customColor, HeaderComponent, TableComponent } from 'src/app/components/index';
import { MessageService } from 'src/app/services/index';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs-compat';
import { ResponseMessage, AccountItem } from 'src/app/models/index';


describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;
  let mockMessageService;
  let exchangeRate = new BehaviorSubject<number>(5);
  let accountList = new BehaviorSubject<Array<AccountItem>>([
    {id: 1, account_name: 'Mercury', category: 'Planets', tag: "Terrestrials", balance: 0, available_balance: 0}
  ]);
  let accountDetail = new BehaviorSubject<ResponseMessage>({
    account_detail: {id: 1, account_name: 'Mercury', category: 'Planets', tag: "Terrestrials", balance: 0, available_balance: 1},
    account_detail_list: [
      { confirmed_date: "02/11/2020 14:25", order_id: 'RAWIAL', order_code: 'LJLLWJ', transaction_type: "Payment received", debit: 0, credit: 0.00040000, balance: 1.05040000 }
    ]
  });
  let validTableData = [
    { confirmed_date: '02/11/2020 14:25', order_id: 'RAWIAL', order_code: 'LJLLWJ', transaction_type: 'Payment received', debit: 'BTC 0$ 0.00', credit: 'BTC 0.0004$ 0.00', balance: 'BTC 1.0504$ 5.25' }
  ]

  beforeEach(async () => {
    mockMessageService = jasmine.createSpyObj(['getExchangeRate','getAccountList','getAccountDetail','sendMessage']);
    mockMessageService.getExchangeRate.and.returnValue(exchangeRate);
    mockMessageService.getAccountList.and.returnValue(accountList);
    mockMessageService.getAccountDetail.and.returnValue(accountDetail);
    mockMessageService.sendMessage;
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatListModule,
        BrowserAnimationsModule
      ],
      declarations: [ 
        AccountDetailComponent,
        priceCalculator,
        customColor,
        TableComponent,
        HeaderComponent
      ],
      providers: [ {provide: MessageService, useValue: mockMessageService} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should correctly render the passed @Input title value', () => {
    component.title="Account";
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toBe("Account");
  });

  it('should correctly render the passed @Input exchangeRate value', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.exchange').textContent).toBe("Exchange: $ 5");
  });
  
  it('should correctly render the passed @Input account value', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toBe("Mercury");
  });

  it('should correctly render the passed @Input available_balance value', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-subtitle').textContent).toBe("Available Balance: BTC 1 ($ 5.00)");
  });

  it('should correctly show the configured headers', () => {
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
