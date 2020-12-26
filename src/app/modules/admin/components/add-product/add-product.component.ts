import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import { AddProductService } from 'src/app/services/add-product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from "@angular/forms"


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  get productId(){
    return this.createForm.get('productId');
  }
  get productName(){
    return this.createForm.get('productName');
  }
  get type(){
    return this.createForm.get('type');
  }

  get price(){
    return this.createForm.get('price');
  }

  get description(){
    return this.createForm.get('description')
  }

  get startDate(){
    return this.createForm.get('startDate')
  }

  get endDate(){
    return this.createForm.get('endDate')
  }
  //product code validation
  productCodeValidators=function(control:AbstractControl):ValidationErrors | null{
    let value:string=control.value || '';
    if(!value)
    {
        return null;
    }
    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (specialCharacters.test(value) === true) {
      return { ProductCodeValidation: `Product Code should not contain special character` };
    }
    let space=' ';
    if(value.indexOf(space)>=0){
      return { ProductCodeValidation: `Product Code should not contain spaces` };
    }
    if(value.length<4){
        return { ProductCodeValidation: `Product Code should be minimum 4 characters` };
      }
      if(value.length > 6){
        return { ProductCodeValidation:`Product Code should be maximum 6 characters ` }
      }
    }

  //product name validation
  productNameValidators=function(control:AbstractControl):ValidationErrors | null{
    let value:string=control.value || '';
    if(!value)
    {
        return null;
    }
    if (/\S/.test(value)===false) {
      return { ProductnameValidation:`Product Name should not contain the whitespaces` }
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
  
  
  constructor(private fb:FormBuilder, private _addProductService: AddProductService, private toaster:ToastrService, private route:Router) { }

  createForm = this.fb.group({
    productId: ['',[Validators.required,this.productCodeValidators]],
    productName: ['',[Validators.required,this.productNameValidators]],
    type: ['',[Validators.required]],
    price: ['',[Validators.required,Validators.min(1),Validators.max(10000)]],
    description : ['',[Validators.required,this.descriptionValidators]],
    startDate : ['',[Validators.required]],
    endDate : ['',[Validators.required]],
    fileSource: ['', Validators.required],
    fileName: '',
  },{
    validator:this.dateLessThan('startDate','endDate'),
  })

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "End date should be greater than start date"
        };
      }
      return {};
    }
}

  ngOnInit(): void {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("startDate")[0].setAttribute('min', today);
    document.getElementsByName("startDate")[0].setAttribute('max','2022-12-31');
    document.getElementsByName("endDate")[0].setAttribute('max','2022-12-31');
  }

  public selectedfile =null;
  public fileName = ''; 
  onFileSelected(event){
    
    // if(event.target.files.length > 0) 
    //  {
    //    this.createForm.patchValue({
    //       fileName: event.target.files[0].name,
    //    })
    //  }
    
    // console.log(event);
    this.selectedfile=event.target.files[0];
    this.fileName = this.selectedfile.name;
    console.log(this.selectedfile.name)
    console.log(this.selectedfile)

  }
    

  create(){
    const formData = new FormData();
    formData.append('productId',this.createForm.get('productId').value);
    formData.append('productName',this.createForm.get('productName').value)
    formData.append('type',this.createForm.get('type').value);
    formData.append('price',this.createForm.get('price').value);
    formData.append('description',this.createForm.get('description').value);
    formData.append('startDate',this.createForm.get('startDate').value);
    formData.append('endDate',this.createForm.get('endDate').value);
    formData.append('image',this.selectedfile,this.selectedfile.name)

    console.log(this.createForm.value)
    this._addProductService.create(formData)
      .subscribe(
        response => {
          if(response.msg === "Invalid Token"){
            localStorage.clear();
            this.route.navigate(['admin'])
          }
          console.log("success",response);
          this.toaster.success('Product added!')
          setTimeout(()=>{
            this.fileName = '';
            this.createForm.reset();
          },2000)
        },
        error => console.log("error!",error)
      )

  }

  public idAlredyExist:boolean = false;

  idCheck(){
    this._addProductService.idCheckUnique(this.createForm.value.productId)
      .subscribe(res => {
        console.log(res)
        if (res != null) {
          console.log('already exists')
          this.idAlredyExist = true;
          this.createForm.controls['productId'].setErrors({'incorrect': true});
        }
        else{
          console.log('not exists')
          this.idAlredyExist = false;
        }
    });
  }
 
}
