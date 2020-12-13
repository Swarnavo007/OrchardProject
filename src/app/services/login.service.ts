import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = "http://localhost:3000/adminlogin";

  constructor(private _http: HttpClient) { }

  login(data){
    return this._http.post<{msg:string,token:string}>(this.loginUrl,data);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
}
