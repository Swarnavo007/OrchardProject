import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../user/auth.guard';
import { HomeComponent } from '../admin/components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProfileComponent } from '../user/components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetComponent } from './components/reset/reset.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';

import { UserComponent } from './user.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'register',component:RegistrationComponent},
  {path:'signup',component:SignupComponent},
  {path:'reset',component:ResetComponent},
  {path:'update',component:UpdatePasswordComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'shop',component:ViewProductsComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'updateProfile',component:UpdateProfileComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
