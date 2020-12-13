import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ToastrModule } from 'ngx-toastr';
import { EmailSubscribersComponent } from './components/email-subscribers/email-subscribers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {TokenInterceptorService} from '../../services/token-interceptor.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
@NgModule({
  declarations: [AdminComponent, LoginComponent, HomeComponent, AddProductComponent, ViewProductComponent, EmailSubscribersComponent, OrdersComponent, DashboardComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule
  ],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }]
})
export class AdminModule { }
