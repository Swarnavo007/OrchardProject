import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AdminModule } from '../admin/admin.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResetComponent } from './components/reset/reset.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SignupComponent } from './components/signup/signup.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
@NgModule({
  declarations: [UserComponent, HeaderComponent, HomeComponent, FooterComponent, ResetComponent, UpdatePasswordComponent, RegistrationComponent, SignupComponent, CheckoutComponent, ViewProductsComponent, CartComponent, ProfileComponent, UpdateProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatListModule
  ]
})
export class UserModule { }
