import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient, private route:Router) { }
  url='https://sumit-icylicious-sep-20.herokuapp.com/productCount';
  ordersUrl='https://sumit-icylicious-sep-20.herokuapp.com/orderCount';
  subscibersUrl='https://sumit-icylicious-sep-20.herokuapp.com/countemail';
  usersUrl='https://sumit-icylicious-sep-20.herokuapp.com/countUser';

  getProducts(){
    return this.http.get<{msg:string}>(this.url);
  }
  getOrders(){
    return this.http.get<{msg:string}>(this.ordersUrl)
  }
  getEmailSubscribers(){
    return this.http.get<{msg:string}>(this.subscibersUrl);
  }

  getUsersCount(){
    return this.http.get<{msg:string}>(this.usersUrl);
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
