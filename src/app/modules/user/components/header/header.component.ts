import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public productLength: any;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: Router,
    private service: CartService,
    private toaster: ToastrService,
    private _registrationService: RegistrationService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  cart: any;
  ngOnInit(): void {
    if(localStorage.getItem('userLogged')){
      this.service
      .getCartDetail(this.decryptData(localStorage.getItem('email')))
      .subscribe((response) => {
        if (response) {
          this.cart = response;
          if (this.cart == 'Cart is empty') {
            this.cart = null;
          } else {
            console.log(this.cart.products);
            if (this.cart.products.length > 0) {
              this.productLength = this.cart.products.length;
            } else {
              this.productLength = '';
            }
          }
        }
      });
    }
  }

  public failed: boolean = false;
  public wrongPass: boolean = false;

  submittButton = false;
  onChange() {
    this.submittButton = !this.submittButton;
    this.failed = false;
    this.wrongPass = false;
  }

  logged: boolean = !!localStorage.getItem('userLogged');
  checklogin;

  onSubmit() {
    this.checklogin = true;
    this.submittButton = !this.submittButton;
    // console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
        // console.log(response);
        if (response.msg === 'failed') {
          this.loginForm.patchValue({
            email: this.loginForm.get('email').value,
            password: '',
          });
          this.wrongPass = true;
        } else if (response.msg === 'success') {
          this.logged = true;
          localStorage.setItem('userLogged', 'true');
          localStorage.setItem('id', response.id.toString());
          localStorage.setItem('userToken', response.usertoken.toString());
          localStorage.setItem(
            'email',
            this.encryptData(response.email.toString())
          );
          this.loginForm.reset();
          this.checklogin = false;
          this.route.navigate(['/']);
          this.toaster.success('Logged In!');
          this.hide();
          this;
        } else {
          this.loginForm.reset();
          this.failed = true;
        }
      },
      (error) => {
        this.failed = true;
        console.log('error occured', error);
        this.loginForm.reset();
      }
    );
  }
  encryptSecretKey = 'esrgr54gyse65tgzs56e4tg56s4rg';
  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this.encryptSecretKey
      ).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data) {
    try {
      if (this.ValidateEmail(data)) {
        this.route.navigate(['']);
        localStorage.clear();
      } else {
        const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
        if (bytes.toString()) {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  }

  public showModal: boolean;

  showLogin() {
    this.submittButton = !this.submittButton;
    this.showModal = true;
  }

  hide() {
    this.submittButton = !this.submittButton;
    this.showModal = false;
  }

  // public logoutModal:boolean;

  // showLogout(){
  //   console.log('click')
  //   this.logoutModal = true;
  // }

  // closeModal(){
  //   this.logoutModal = false;
  // }
  showDeleteModal: boolean;

  showDelete() {
    this.submittButton = !this.submittButton;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.submittButton = !this.submittButton;
    this.showDeleteModal = false;
  }

  logout(){
    this.submittButton=!this.submittButton;
    localStorage.removeItem('userLogged')
    localStorage.removeItem('userToken')
    localStorage.removeItem('email')
    localStorage.removeItem('id')
    this.route.navigate([''])
    document.location.reload();
  }

  updatePassword() {
    this.route.navigate(
      ['update', { email: this.decryptData(localStorage.getItem('email')) }],
      { skipLocationChange: true }
    );
  }

  verifyModal: boolean;

  showVeifyModal() {
    this.submittButton = !this.submittButton;
    this.verifyModal = true;
  }

  closeVeifyModal() {
    this.submittButton = !this.submittButton;
    this.verifyModal = false;
  }

  get passowrd() {
    return this.verifyForm.get('password');
  }

  verifyForm = this.fb.group({
    password: ['', [Validators.required]],
  });

  passwordError: boolean;

  verifyPassword() {
    this.verifyForm.addControl(
      'email',
      this.fb.control('', Validators.required)
    );
    this.verifyForm.patchValue({
      ['email']: this.decryptData(localStorage.getItem('email')),
    });
    console.log(this.verifyForm.value);
    this._registrationService
      .verifyPassword(this.verifyForm.value)
      .subscribe((response) => {
        console.log(response);
        if (response.msg === 'success') {
          this.route.navigate(
            [
              'updateProfile',
              { email: this.decryptData(localStorage.getItem('email')) },
            ],
            { skipLocationChange: true }
          );
        } else {
          this.passwordError = true;
        }
      });
  }

  verifyModalPass: boolean;

  showVeifyModalPass() {
    this.submittButton = !this.submittButton;
    this.verifyModalPass = true;
  }

  closeVeifyModalPass() {
    this.submittButton = !this.submittButton;
    this.verifyModalPass = false;
  }

  verifyPasswordUpdate() {
    this.verifyForm.addControl(
      'email',
      this.fb.control('', Validators.required)
    );
    this.verifyForm.patchValue({
      ['email']: this.decryptData(localStorage.getItem('email')),
    });
    console.log(this.verifyForm.value);
    this._registrationService
      .verifyPassword(this.verifyForm.value)
      .subscribe((response) => {
        // console.log(response);
        if (response.msg === 'success') {
          this.route.navigate(
            [
              'update',
              { email: this.decryptData(localStorage.getItem('email')) },
            ],
            { skipLocationChange: true }
          );
        } else {
          this.passwordError = true;
          setTimeout(() => {
            this.passwordError = false;
          }, 2000);
        }
      });
  }
}
