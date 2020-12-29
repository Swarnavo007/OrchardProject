import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHandler, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  checkMail = "https://sumit-icylicious-sep-20.herokuapp.com/mail";
  registerUrl = "https://sumit-icylicious-sep-20.herokuapp.com/user";
  resetUrl = "https://sumit-icylicious-sep-20.herokuapp.com/reset"
  updateUrl = "https://sumit-icylicious-sep-20.herokuapp.com/updatePass";
  updateProfile="https://sumit-icylicious-sep-20.herokuapp.com/updateuser";
  users="https://sumit-icylicious-sep-20.herokuapp.com/mail";
  emailCheckUnique(email){
    // console.log(this.checkMail+`?mail=${email}`)
    return this._http.get(this.checkMail+`?email=${email}`)
  }

  register(data){
    return this._http.post(this.registerUrl,data)
  }

  reset(data){
    return this._http.post<{msg:string,email:string}>(this.resetUrl,data)
  }

  updatePassword(data){
    return this._http.patch(this.updateUrl,data);
  }
  updateUserProfile(data){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('userToken') });
    return this._http.post(this.updateProfile,data,{headers: header});
  }
  getUsers(email){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('userToken') });
      return this._http.get(this.users+`?email=${email}`,{headers: header})
  }
 
}
