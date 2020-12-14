import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthstateGuard implements CanActivate {
  
  constructor(private _loginService:LoginService, private _route: Router){}
  

  canActivate():boolean{
    if(!this._loginService.loggedIn()){
      return true
    }
    else{
      this._route.navigate(['/dashboard/analysis'])
      return false;
    }
  }
  
}
