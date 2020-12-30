import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import * as CryptoJS from 'crypto-js';
import {Title} from "@angular/platform-browser";
import { RegistrationService } from 'src/app/services/registration.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  encryptSecretKey = "esrgr54gyse65tgzs56e4tg56s4rg";
  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  constructor(private route:Router,private service:ProfileService,private router:Router,
     private titleService:Title, private _registrationService:RegistrationService, private fb:FormBuilder) { 
    this.titleService.setTitle("Icy-Licious | Profile");
  }
  
  public orders:any=[];
  public orderByemail:any=[];
  public items:any=[];
  public flag=0;
  showDeleteModal:boolean
  showViewModel:boolean
  email = this.decryptData(localStorage.getItem('email'))
  name;
  
  ngOnInit(){
    console.log("email"+this.email);
    this.service.getOrders().subscribe((response)=>{
      if (response.msg === 'Invalid Token') {
        localStorage.clear();
        this.route.navigate(['']);
      }
       this.orders=response;
      for(var i=0;i<this.orders.length;i++){
        if(this.orders[i].userId==this.email){
            this.orderByemail.push(this.orders[i]);
            console.log(this.orderByemail);
            this.flag=1;
        }
      }
      console.log("flag"+this.flag)
      if(this.flag==0){
        this.showViewModel=true;
        console.log("no orders are found");


      }
      // console.log("length"+this.orderByemail.itemPurchased);
    })
    this._registrationService.getUsers(this.decryptData(localStorage.getItem('email')))
      .subscribe(response =>{
        this.name = response.name;
      })

  }
  getDate(date:any){
    let newDate = date.substring(0,10)
    return newDate
  }
  // closeOrderModal() {
  //   // this.showViewModel = false;
  //   this.router.navigate(['shop']);
  // }
  shopNow(){
    this.router.navigate(['shop']);
  }

  showDelete(){
    this.showDeleteModal = true;
  }

  closeModal(){
    this.showDeleteModal = false;
  }


  verifyModal:boolean;

  showVeifyModal(){
    this.verifyModal = true;
  }

  closeVeifyModal(){
    this.verifyModal = false;
  }

  get passowrd(){
    return this.verifyForm.get('password')
  }

  verifyForm = this.fb.group({
    password:['',[Validators.required]]
  })

  passwordError:boolean

  verifyPassword(){
    this.verifyForm.addControl('email', this.fb.control('', Validators.required));   
    this.verifyForm.patchValue({['email']:this.decryptData(localStorage.getItem('email'))})
    console.log(this.verifyForm.value)
    this._registrationService.verifyPassword(this.verifyForm.value)
    .subscribe((response)=>{
      console.log(response)
      if(response.msg === "success"){
        this.router.navigate(['updateProfile',{email:this.decryptData(localStorage.getItem('email'))}],{skipLocationChange:true})
      }
      else{
        this.passwordError = true
        setTimeout(()=>{
          this.passwordError = false
        },2000)
        this.verifyForm.reset();
      }
    })
  }

  logout(){
    localStorage.removeItem('userLogged')
    localStorage.removeItem('userToken')
    localStorage.removeItem('email')
    localStorage.removeItem('id')
    this.route.navigate(['/'])
  }



  updatePassword(){
    this.route.navigate(['update',{email:this.decryptData(localStorage.getItem('email'))}],{skipLocationChange:true})
  }
  // updateProfile(){
  //   this.route.navigate(['/updateProfile'])
  // }

}
