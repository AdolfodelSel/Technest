import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {
  HomeComponent,
  AccountsComponent,
  AccountDetailComponent,
  HeaderComponent,
  TableComponent,
  customColor,
  priceCalculator
} from 'src/app/components/index';

import {
  WebsocketService,
  MessageService
} from 'src/app/services/index';

let modules = [
  MatIconModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatListModule,
  BrowserAnimationsModule,
  BrowserModule.withServerTransition({ appId: 'serverApp' }),
  AppRoutingModule
];

let components = [
  AppComponent,
  HomeComponent,
  AccountsComponent,
  AccountDetailComponent,
  HeaderComponent,
  TableComponent,
  customColor,
  priceCalculator
];

let services = [
  WebsocketService,
  MessageService
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  providers: [
    ...services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
