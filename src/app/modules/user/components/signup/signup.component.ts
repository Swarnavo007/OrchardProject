import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { ConfirmedValidator } from '../../../../services/confirmed.validator';
import { PasswordStrengthValidator,nameValidators} from '../../../../services/password-strength.validator';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  get name(){
    return this.registrationForm.get('name')
  }
  get email(){
    return this.registrationForm.get('emailID')
  }

  get password(){
    return this.registrationForm.get('password');
  } 

  get confirmPassword(){
    return this.registrationForm.get('confirmPassword')
  }

  get phone(){
    return this.registrationForm.get('phone')
  }

  get question(){
    return this.registrationForm.get('question')
  }

  get answer(){
    return this.registrationForm.get('answer')
  }

  constructor(private fb:FormBuilder,private route:ActivatedRoute, private router:Router ,
    private _registrationService:RegistrationService, private toaster:ToastrService, private titleService:Title) { 
    this.titleService.setTitle("Icy-Licious | Signup");
  }

  ngOnInit(): void {
  }

  registrationForm = this.fb.group({
    name: ['',[Validators.required,nameValidators]],
    emailID: [{value: this.route.snapshot.paramMap.get('email'), disabled: true}],
    password: ['',[Validators.required,PasswordStrengthValidator]],
    confirmPassword: ['',[Validators.required,Validators.minLength(8)]],
    question: ['',[Validators.required]],
    answer: ['',[Validators.required,Validators.minLength(3)]],
    phone : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.min(6000000000),Validators.max(9999999999)]]
  },{
    validator: ConfirmedValidator('password', 'confirmPassword')
  })

  onSubmit(){
    console.log(this.registrationForm);
    this.registrationForm.addControl('email', this.fb.control('', Validators.required));   
    this.registrationForm.patchValue({['email']:this.route.snapshot.paramMap.get('email')})
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response =>{ 
          console.log("success",response)
          this.toaster.success('Registration completed!')
          this.router.navigate([''])
        },
        error => console.log("error!",error)
      );
    this.registrationForm.reset();
  }


}
