import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, AccountsComponent, AccountDetailComponent } from './components/index';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'full'
      },
      {
        path: 'accounts',
        component: AccountsComponent
      },
      {
        path: 'account/:accountId',
        component: AccountDetailComponent
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home/accounts',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: 'home/accounts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
