import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/user/components/home/home.component';


const routes: Routes = [
  {path:'admin', loadChildren:() => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path:'', component:HomeComponent},
];

//changes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
