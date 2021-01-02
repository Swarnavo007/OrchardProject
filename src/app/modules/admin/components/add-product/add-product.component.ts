import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddProductService } from 'src/app/services/add-product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PasswordStrengthValidator,productCodeValidators,productNameValidators,descriptionValidators} from '../../../../services/password-strength.validator';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  get productId() {
    return this.createForm.get('productId');
  }
  get productName() {
    return this.createForm.get('productName');
  }
  get type() {
    return this.createForm.get('type');
  }

  get price() {
    return this.createForm.get('price');
  }

  get description() {
    return this.createForm.get('description');
  }

  get startDate() {
    return this.createForm.get('startDate');
  }

  get endDate() {
    return this.createForm.get('endDate');
  }
 

  constructor(
    private fb: FormBuilder,
    private _addProductService: AddProductService,
    private toaster: ToastrService,
    private route: Router,
    private titleService:Title
  ) {
    this.titleService.setTitle("Icy-Licious | Admin | Add Product");
  }

  createForm = this.fb.group(
    {
      productId: ['', [Validators.required, productCodeValidators]],
      productName: ['', [Validators.required, productNameValidators]],
      type: ['', [Validators.required]],
      price: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000)],
      ],
      description: ['', [Validators.required, descriptionValidators]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      fileSource: ['', Validators.required],
      fileName: '',
    },
    {
      validator: [this.dateLessThan('startDate', 'endDate'),this.dateCompare('startDate')],
    }
  );

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: 'End date should be greater than start date',
        };
      }
      return {};
    };
  }

  dateCompare(from:string){
    return (group: FormGroup): { [key: string]: any } => {
      let f= group.controls[from];
      let t= new Date().toISOString().split('T')[0];
      if (f.value < t) {
        return {
          date1: 'Start date should be greater than today date',
        };
      }
      return {};
    };
  }

  ngOnInit(): void {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName('startDate')[0].setAttribute('min', today);
    document
      .getElementsByName('startDate')[0]
      .setAttribute('max', '2022-12-31');
    document.getElementsByName('endDate')[0].setAttribute('max', '2022-12-31');
  }

  public selectedfile = null;
  public fileName = '';
  public validfile:boolean = false;
  onFileSelected(event) {
    // if(event.target.files.length > 0)
    //  {
    //    this.createForm.patchValue({
    //       fileName: event.target.files[0].name,
    //    })
    //  }

    // console.log(event);
    this.selectedfile = event.target.files[0];
    this.fileName = this.selectedfile.name;
    console.log("file name: ",this.selectedfile.name);
    let index= (this.selectedfile.name).lastIndexOf('.');
    let ext = (this.selectedfile.name).slice(index);
    console.log(ext);
    console.log(this.selectedfile);
    if(ext=='.jpg' || ext=='.jpeg'||ext=='.png'){
      this.validfile=true;
    }
    else{
      this.validfile=false;
    }
  }
  
  checkadded;
 
  create() {
    this.checkadded = true;
    const formData = new FormData();
    formData.append(
      'productId',
      this.createForm.get('productId').value.toUpperCase()
    );
    formData.append('productName', this.createForm.get('productName').value);
    formData.append('type', this.createForm.get('type').value);
    formData.append('price', this.createForm.get('price').value);
    formData.append('description', this.createForm.get('description').value);
    formData.append('startDate', this.createForm.get('startDate').value);
    formData.append('endDate', this.createForm.get('endDate').value);
    formData.append('image', this.selectedfile, this.selectedfile.name);

    console.log(this.createForm.value);
    this._addProductService.create(formData).subscribe(
      (response) => {
        if (response.msg === 'Invalid Token') {
          localStorage.clear();
          this.route.navigate(['admin']);
        }
        console.log('success', response);
        this.toaster.success('Product added!');
        setTimeout(() => {
          this.fileName = '';
          this.createForm.reset();
          this.checkadded = false;
        }, 2000);
      },
      (error) => console.log('error!', error)
    );
  }

  public idAlredyExist: boolean = false;
  submitButton=false;
  idCheck() {
    this._addProductService
      .idCheckUnique(this.createForm.value.productId.toUpperCase())
      .subscribe((res) => {
        console.log(res);
        if (res != null) {
          console.log('already exists');
          this.idAlredyExist = true;
          this.createForm.controls['productId'].setErrors({ incorrect: true });
        } else {
          console.log('not exists');
          this.idAlredyExist = false;
        }
      });
  }
}
