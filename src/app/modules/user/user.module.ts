import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AdminModule } from '../admin/admin.module';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatToolbarModule
  ]
})
export class UserModule { }
