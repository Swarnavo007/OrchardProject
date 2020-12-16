import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthstateGuard } from '../app/modules/admin/authstate.guard';
import { AdminModule } from './modules/admin/admin.module';
import { LoginComponent } from './modules/admin/components/login/login.component';


const routes: Routes = [
  {path:'admin',component:LoginComponent, canActivate:[AuthstateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
