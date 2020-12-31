import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  // constructor() { }

  testurl=`https://sumit-icylicious-sep-20.herokuapp.com/product/${""}`;
  id;
  constructor(private http:HttpClient) { }

  getCart="https://sumit-icylicious-sep-20.herokuapp.com/getcart";
  getImageUrl="https://sumit-icylicious-sep-20.herokuapp.com/product";
  updateCartUrl="https://sumit-icylicious-sep-20.herokuapp.com/setcart";
  deleteProductUrl="https://sumit-icylicious-sep-20.herokuapp.com/delitem";
  placeOrderUrl="https://sumit-icylicious-sep-20.herokuapp.com/createOrders";
  getCartDetail(userId){
    this.id={'userId':userId};
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.post<{msg:string}>(this.getCart,(this.id),{headers:header});
  }

  getImageDetail(productId){
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.get<{msg:string}>(`${this.getImageUrl}/${productId}`,{headers:header});
  }

  updateCartDetail(cart){
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.post<{msg:string}>(this.updateCartUrl,cart, {headers:header});
  }

  deleteProduct(productDetail){
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.post<{msg:string}>(this.deleteProductUrl,productDetail, {headers:header});
  }

  placeOrder(cart){
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.post<{msg:string}>(this.placeOrderUrl,cart, {headers:header});
  }

  deleteUserCart(userId){
    this.id=JSON.stringify({'userId':userId});
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    let url = "https://sumit-icylicious-sep-20.herokuapp.com/delusercart/" + userId
    return this.http.delete<{msg:string}>(url, {headers:header});
  }

}
