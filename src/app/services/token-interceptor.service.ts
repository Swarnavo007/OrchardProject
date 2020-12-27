import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req,next){
     let token = localStorage.getItem('userToken')
     if(token === null){
       token = 'XYZ'
     }
    let tokenizedReq = req.clone({
      setHeaders :{
        Authorization : token
      }
    })
    return next.handle(tokenizedReq)
  }
}
