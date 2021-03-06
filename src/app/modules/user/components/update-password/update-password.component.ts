import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../../../../services/confirmed.validator';
import { RegistrationService } from 'src/app/services/registration.service';
import { PasswordStrengthValidator } from '../../../../services/password-strength.validator';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  get email() {
    return this.resetForm.get('email');
  }
  get password() {
    return this.resetForm.get('password');
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    public router: Router,
    public route: ActivatedRoute,
    private toaster: ToastrService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Icy-Licious | Reset');
  }

  ngOnInit(): void {}

  resetForm = this.fb.group(
    {
      email: [this.route.snapshot.paramMap.get('email')],
      password: ['', [Validators.required, PasswordStrengthValidator]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validator: ConfirmedValidator('password', 'confirmPassword'),
    }
  );
  submitButton = false;
  onSubmit() {
    this.submitButton = !this.submitButton;
    // console.log(this.resetForm.value)
    this.registrationService.updatePassword(this.resetForm.value).subscribe(
      (response) => {
        // console.log(response)
        this.toaster.success('Password Changed Successfully!');
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
