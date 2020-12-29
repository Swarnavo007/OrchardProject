import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  public token;
  intercept(req,next){
    if(!!localStorage.getItem('userLogged') === true){
      this.token = localStorage.getItem('userToken') 
    }
    else{
      this.token = localStorage.getItem('token') 
    }
     if(this.token === null){
       this.token = 'XYZ'
     }
    let tokenizedReq = req.clone({
      setHeaders :{
        Authorization : this.token
      }
    })
    return next.handle(tokenizedReq)
  }
}
