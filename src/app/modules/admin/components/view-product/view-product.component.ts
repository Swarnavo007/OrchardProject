import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ViewProductService } from 'src/app/services/view-product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from "@angular/forms"
import { PasswordStrengthValidator,productCodeValidators,productNameValidators,descriptionValidators} from '../../../../services/password-strength.validator';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  public products;

  get productId() {
    return this.updateForm.get('productId');
  }
  get productName() {
    return this.updateForm.get('productName');
  }
  get type() {
    return this.updateForm.get('type');
  }

  get price() {
    return this.updateForm.get('price');
  }

  get description() {
    return this.updateForm.get('description');
  }

  get startDate() {
    return this.updateForm.get('startDate');
  }

  get endDate() {
    return this.updateForm.get('endDate');
  }
 //product name validation
 productNameValidators=function(control:AbstractControl):ValidationErrors | null{
  let value:string=control.value || '';
  console.log("value is "+value);
  if(!value)
  {
      return null;
  }
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === true) {
    return { ProductnameValidation: `Product Name should not contain special character` };
  }
  if(value.length<4){
      return { ProductnameValidation: `Product Name should be minimum 4 characters` };
    }
    if(value.length > 20){
      return { ProductnameValidation:`Product Name should be maximum 20 characters ` }
    }
    if (/\S/.test(value)===false) {
      return { ProductnameValidation:`Product Name should not contain the whitespaces ` }
  }
  }
   //description validation
   descriptionValidators=function(control:AbstractControl):ValidationErrors | null{
    let value:string=control.value || '';
    if(!value)
    {
        return null;
    }
    if (/\S/.test(value)===false) {
      return { DescriptionValidation:`Description should not contain whitespaces ` }
  }
    if(value.replace(/\s/g, "").length < 10){
        return { DescriptionValidation: `Description should be minimum 10 characters` };
      }
      if(value.replace(/\s/g, "").length > 100){
        return { DescriptionValidation:`Description should be maximum 100 characters ` }
      }

    }

  constructor(
    private service: ViewProductService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private route: Router
  ) {}

  updateForm = this.fb.group(
    {
      productId: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(6)],
      ],
      productName: [
        '',
        [
          Validators.required,
          productNameValidators
        ],
      ],
      type: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1),Validators.max(10000)]],
      description: [
        '',
        [
          Validators.required,
          descriptionValidators
        ],
      ],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      fileSource: [''],
      fileName: '',
    },
    {
      validator: [this.dateLessThan('startDate', 'endDate'),this.dateCompare('startDate')],
    }
  );
  emptyProducts = false;
  ngOnInit(): void {
    this.service.getProducts().subscribe((response) => {
      if (response.msg === 'Invalid Token') {
        localStorage.clear();
        this.route.navigate(['admin']);
      }
      this.products = response;
      if (this.products.length < 1) {
        this.emptyProducts = true;
      }
      for (var i = 0; i < this.products.length; i++) {
        this.products[i].productStartDate = this.setDate(
          this.products[i].productStartDate
        );
        this.products[i].productEndDate = this.setDate(
          this.products[i].productEndDate
        );
        if (this.products[i].productEndDate < today) {
          this.products[i]['expired'] = true;
        }
      }
      console.log(this.products);
    });
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName('start')[0].setAttribute('min', today);
    document.getElementsByName('start')[0].setAttribute('max', '2022-12-31');
    document.getElementsByName('end')[0].setAttribute('max', '2022-12-31');
  }

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

  public selectedfile = null;
  public fileName:string = '';
  public validfile:boolean = true;
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.updateForm.patchValue({
        fileName: event.target.files[0].name,
      });
    }

    console.log(event);
    this.selectedfile = event.target.files[0];
    this.fileName = this.selectedfile.name;
    console.log(this.selectedfile.name);
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
    console.log(this.selectedfile);
  }

  showModal: boolean;

  setDate(string) {
    return string.substr(0, string.indexOf('T'));
  }

  show(product) {
    this.updateForm.controls['productId'].disable();
    console.log(product);
    this.showModal = true;
    console.log(product.productId);
    this.updateForm.patchValue({
      productId: product.productId,
      productName: product.productName,
      type: product.productType,
      price: product.productPrice,
      description: product.productDescription,
      startDate: product.productStartDate,
      endDate: product.productEndDate,
    });
  }

  update() {
    const formData = new FormData();
    console.log(this.updateForm);
    formData.append('productId', this.updateForm.get('productId').value);
    formData.append('productName', this.updateForm.get('productName').value);
    formData.append('type', this.updateForm.get('type').value);
    formData.append('price', this.updateForm.get('price').value);
    formData.append('description', this.updateForm.get('description').value);
    formData.append('startDate', this.updateForm.get('startDate').value);
    formData.append('endDate', this.updateForm.get('endDate').value);
    if (this.selectedfile != null) {
      formData.append('image', this.selectedfile, this.selectedfile.name);
    }
    console.log(formData);
    this.service.updateProducts(formData).subscribe((res) => {
      console.log(res);
      if (res.msg === 'Invalid Token') {
        localStorage.clear();
        this.route.navigate(['admin']);
      }
      if (res.msg === 'Data updated Successfully') {
        this.toaster.success('Product Updated!');
        setTimeout(() => {
          this.hide();
          this.route.navigate(['dashboard/analysis']);
        }, 1000);
      }
    });
  }
  hide() {
    this.showModal = false;
  }

  showDeleteModal: boolean;

  showDelete() {
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showDeleteModal = false;
  }

  public tempForDelete;
  delete() {
    let productId = { productId: this.tempForDelete.productId };
    console.log(productId);

    this.service.deleteProduct(productId).subscribe((res) => {
      console.log(res);
      if (res.msg === 'Invalid Token') {
        localStorage.clear();
        this.route.navigate(['admin']);
      }
      if (res.msg == 'Data deleted Successfully') {
        this.toaster.success('Product deleted!');
        setTimeout(() => {
          this.closeModal();
          this.hide();
          this.route.navigate(['dashboard/analysis']);
        }, 1000);
      }
    });
  }

  getProductfordelete(product) {
    this.tempForDelete = product;
  }
}
