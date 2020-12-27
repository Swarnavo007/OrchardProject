import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = "https://sumit-icylicious-sep-20.herokuapp.com/adminlogin";
  
  _url = 'https://sumit-icylicious-sep-20.herokuapp.com/login'

  constructor(private _http: HttpClient) { }

  adminLogin(data){
    return this._http.post<{msg:string,token:string}>(this.loginUrl,data);
  }

  login(data){
    return this._http.post<{msg:String,id:String,usertoken:String,email:String}>(this._url,data)
  }

  loggedIn(){
    return !!localStorage.getItem('userToken')
  }

  userLoggedIn(){
    return !!localStorage.getItem('userToken')
  }


}
