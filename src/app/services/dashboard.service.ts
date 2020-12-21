import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient, private route:Router) { }

  getProducts(){
    return this.http.get<{msg:string}>('https://sumit-icylicious-sep-20.herokuapp.com/productCount');
  }
  getOrders(){
    return this.http.get<{msg:string}>('https://sumit-icylicious-sep-20.herokuapp.com/orderCount')
  }
  getEmailSubscribers(){
    return this.http.get<{msg:string}>('https://sumit-icylicious-sep-20.herokuapp.com/countemail' );
  }

  getUsersCount(){
    return this.http.get<{msg:string}>('https://sumit-icylicious-sep-20.herokuapp.com/countUser' );
  }

  token;
  getToken(){
    this.token = localStorage.getItem('token');
    if(this.token != 'undefined'){
      return this.token;
    }
    else{
      this.route.navigate(['admin'])
    }
  }

}
