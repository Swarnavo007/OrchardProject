import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../admin/auth.guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmailSubscribersComponent } from './components/email-subscribers/email-subscribers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthstateGuard } from './authstate.guard';
const routes: Routes = [{ path: '', component: LoginComponent, canActivate:[AuthstateGuard]},
  
  {path:'dashboard',component:HomeComponent, children:[{path:'add-product',component:AddProductComponent},
  {path:'view-product',component:ViewProductComponent},
  {path:'orders',component:OrdersComponent},
  {path:'subscibers',component:EmailSubscribersComponent},
  {path:'analysis',component:DashboardComponent},   
],canActivate:[AuthGuard]},
  {path:'**',component:PageNotFoundComponent}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
