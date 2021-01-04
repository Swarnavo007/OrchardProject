import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { RegistrationService } from 'src/app/services/registration.service';
import { nameValidators} from '../../../../services/password-strength.validator';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  get name(){
    return this.updateForm.get('name')
  }
  get email(){
    return this.updateForm.get('emailID')
  }

  get phone(){
    return this.updateForm.get('phone')
  }

  get question(){
    return this.updateForm.get('question')
  }

  get answer(){
    return this.updateForm.get('answer')
  }
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
 public users:any=[];
  constructor(private fb:FormBuilder, private toaster:ToastrService, private route:ActivatedRoute,
    private _registrationService:RegistrationService,private router:Router) {
   }
  ngOnInit(): void {
    this._registrationService.getUsers(this.route.snapshot.paramMap.get('email'))
    .subscribe((response)=>{
      this.users=response;
      // console.log(this.users);
      this.updateForm.patchValue({
        name: this.users.name,
        phone: this.users.phone,
        question: this.users.question,
        answer: this.users.answer
      });
    })
  
  
  }

  updateForm = this.fb.group({
    name: ['',[Validators.required,nameValidators]],
    emailID: [{value:this.route.snapshot.paramMap.get('email'), disabled: true}],
    question: ['',[Validators.required]],
    answer: ['',[Validators.required,Validators.minLength(3)]],
    phone : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
  })

  onSubmit(){
    // console.log(this.updateForm);
    this.updateForm.addControl('email', this.fb.control('', Validators.required));   
    this.updateForm.patchValue({['email']:this.route.snapshot.paramMap.get('email')})

    this._registrationService.updateUserProfile(this.updateForm.value)
      .subscribe(
        // response => console.log("success",response),
        // error => console.log("error!",error)
      );
      this.router.navigate(['profile'])
      this.toaster.success('Profile Updated!')
    this.updateForm.reset();
  }

}

