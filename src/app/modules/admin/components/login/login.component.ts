import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  constructor(private fb:FormBuilder,private _loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }


  loginForm = this.fb.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required]]
  })

  public failed:boolean = false;
  public wrongPass:boolean = false;


  login(){
    console.log(this.loginForm.value)
    this._loginService.login(this.loginForm.value)
      .subscribe(
        response =>{
          if(response.msg === "invalid"){
            this.loginForm.reset();
            this.failed = true;
          }
          else if(response.msg === "failed"){
            this.loginForm.patchValue({email: this.loginForm.get('username').value,password:''});
            this.wrongPass = true;
          }
          else if(response.msg === "success"){
            console.log(response); 
            localStorage.setItem('logged','true');
            localStorage.setItem('token',response.token)
            this.router.navigate(['dashboard/analysis'])
          }
      })
    }
  onChange(){
    this.failed = false;
    this.wrongPass = false;
  }

  

}
