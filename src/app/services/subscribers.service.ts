import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private HttpClient: HttpClient, private route:Router) { }

  url = 'http://localhost:3000/getemail';
  getSubscibers() {
    return this.HttpClient.get<{msg:string}>(this.url);
  }
  
  token;
  getToken(){
    this.token = localStorage.getItem('token');
    if(this.token != 'undefined'){
      return this.token;
    }
    else{
      this.route.navigate(['login'])
    }

  }

}
