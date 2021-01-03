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
      this.route.navigate(['admin'])
    }

  }

  header = new HttpHeaders({
    'Authorization': this.getToken() });


  url = 'https://sumit-icylicious-sep-20.herokuapp.com/products';
  constructor(private HttpClient: HttpClient,private route:Router) {}
  getProducts() {
    return this.HttpClient.get<{msg:string}>(this.url);
  }
  updateProducts(data){
    return this.HttpClient.patch<{msg:string}>('https://sumit-icylicious-sep-20.herokuapp.com/product',data)
  }

  deleteProduct(id){
    // console.log(id);
    return this.HttpClient.post<{msg:string}>('https://sumit-icylicious-sep-20.herokuapp.com/deleteproduct',id)
  }
}
