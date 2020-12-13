import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {

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

  header = new HttpHeaders({
    'Authorization': this.getToken() });


  url = 'http://localhost:3000/products';
  constructor(private HttpClient: HttpClient,private route:Router) {}
  getProducts() {
    return this.HttpClient.get(this.url);
  }
  updateProducts(data){
    return this.HttpClient.patch<{msg:string}>('http://localhost:3000/product',data)
  }

  deleteProduct(id){
    console.log(id);
    return this.HttpClient.post<{msg:string}>('http://localhost:3000/deleteproduct',id)
  }
}
