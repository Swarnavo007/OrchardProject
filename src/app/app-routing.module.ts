import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/admin/components/login/login.component';
import { AuthstateGuard } from '../app/modules/admin/authstate.guard';

const routes: Routes = [
  { path: 'admin', component: LoginComponent, canActivate: [AuthstateGuard] },
  {
    path: '',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
