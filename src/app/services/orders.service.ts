import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  header = new HttpHeaders({
    'Authorization': this.getToken() });

  url="http://localhost:3000/getOrders"
  constructor(private HttpClient: HttpClient, private route:Router) { }
  getOrdersList() {
    return this.HttpClient.get<{msg:string}>(this.url);
  }

  setStatus(orderId,status){
    return this.HttpClient.patch<{msg:string}>("http://localhost:3000/updateOrderStatus",
    {_id:orderId,status:status})
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
