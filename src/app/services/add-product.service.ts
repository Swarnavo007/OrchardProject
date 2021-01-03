import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  _url = "https://sumit-icylicious-sep-20.herokuapp.com/product";
  constructor(private _http: HttpClient,private route:Router) { }
   header = new HttpHeaders({
    'Authorization': this.getToken() });

  create(userData){
    
    return this._http.post<{msg:string}>(this._url,userData);
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

  idCheckUnique(id){
    // console.log(id);
    return this._http.get(`https://sumit-icylicious-sep-20.herokuapp.com/id?id=${id}`)
  }

}
