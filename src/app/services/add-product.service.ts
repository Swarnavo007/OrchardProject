import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  _url = "http://localhost:3000/product";
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
      this.route.navigate(['login'])
    }

  }

  idCheckUnique(id){
    console.log(id);
    return this._http.get(`http://localhost:3000/id?id=${id}`)
  }

}
