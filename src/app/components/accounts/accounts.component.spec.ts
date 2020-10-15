import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'src/app/services/index';
import { AccountsComponent, priceCalculator, customColor, HeaderComponent, TableComponent } from 'src/app/components/index';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs-compat';
import { ResponseMessage, AccountItem } from 'src/app/models/index';


describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;
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
    { account_name: 'Mercury', category: 'Planets', tag: 'Terrestrials', balance: 'BTC 0$ 0.00', available_balance: 'BTC 0$ 0.00' }
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
        AccountsComponent,
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
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should correctly render the passed @Input title value', () => {
    component.title="Accounts";
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toBe("Accounts");
  });

  it('should correctly render the passed @Input exchangeRate value', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.exchange').textContent).toBe("Exchange: $ 5");
  });

  it('should correctly show the configured headers', () => {
    let tableDom = document.querySelector('table');
    let tableHeaders = Array.from(
      tableDom.getElementsByClassName('mat-header-cell')
    );
    let headerClasses = [
      'mat-column-accountName',
      'mat-column-category',
      'mat-column-tag',
      'mat-column-balance',
      'mat-column-availableBalance'
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
      let accountName = item
        .getElementsByClassName('mat-column-accountName')
        .item(0).textContent;
      let category = item
        .getElementsByClassName('mat-column-category')
        .item(0).textContent;
      let tag = item
        .getElementsByClassName('mat-column-tag')
        .item(0).textContent;
      let balance = item
        .getElementsByClassName('mat-column-balance')
        .item(0).textContent;
      let availableBalance = item
        .getElementsByClassName('mat-column-availableBalance')
        .item(0).textContent;
      
      expect(validTableData).toContain(
        jasmine.objectContaining({
          account_name: accountName,
          category: category,
          tag: tag,
          balance: balance,
          available_balance: availableBalance
        })
      );
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
