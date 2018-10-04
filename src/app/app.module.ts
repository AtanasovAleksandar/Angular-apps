import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { EditComponent } from './customers/edit/edit.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailViewComponent } from './customers/detail-view/detail-view.component';


const appRouters: Routes = [
  {path: 'Customers/:activePage/:search' , component: CustomersComponent},
  {path: 'EditCustomer/:customerId' , component: EditComponent},
  {path: 'DetailView/:detailCustomer', component: DetailViewComponent},
  {path: 'Orders' , component: OrdersComponent},
  {path: 'About' , component: AboutComponent},
  {path: 'new-customer' , component: NewCustomerComponent },
  {path: '' , redirectTo: "Customers/1/none" , pathMatch: 'full'},
  {path: '**' , redirectTo: "Customers/1/none" , pathMatch:'full'}
] 

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    OrdersComponent,
    AboutComponent,
    EditComponent,
    NewCustomerComponent,
    DetailViewComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot(appRouters),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
