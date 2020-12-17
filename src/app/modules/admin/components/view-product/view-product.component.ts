import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import { ViewProductService } from 'src/app/services/view-product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  public products;

  get productId(){
    return this.updateForm.get('productId');
  }
  get productName(){
    return this.updateForm.get('productName');
  }
  get type(){
    return this.updateForm.get('type');
  }

  get price(){
    return this.updateForm.get('price');
  }

  get description(){
    return this.updateForm.get('description')
  }

  get startDate(){
    return this.updateForm.get('startDate')
  }

  get endDate(){
    return this.updateForm.get('endDate')
  }

  constructor(private service: ViewProductService,private fb:FormBuilder,private toaster:ToastrService,private route:Router) {
    
  }

  updateForm = this.fb.group({
    
    productId: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(6)]],
    productName: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
    type: ['',[Validators.required]],
    price: ['',[Validators.required,Validators.min(1)]],
    description : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(100)]],
    startDate : ['',[Validators.required]],
    endDate : ['',[Validators.required]],
    fileSource: ['',],
    fileName: '',
  },{
    validator:this.dateLessThan('startDate','endDate')
  })
  emptyProducts = false;
  ngOnInit(): void {
    this.service.getProducts().subscribe((response) => {
      if(response.msg === "Invalid Token"){
        localStorage.clear();
        this.route.navigate(['admin'])
      }
      this.products = response;
      if(this.products.length < 1){
        this.emptyProducts = true;
      }
      for(var i=0;i<this.products.length;i++){
        this.products[i].productStartDate = this.setDate(this.products[i].productStartDate)
        this.products[i].productEndDate = this.setDate(this.products[i].productEndDate)
        if(this.products[i].productEndDate < today){
          this.products[i]['expired'] = true;
        }
      }
      console.log(this.products)
    });
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("start")[0].setAttribute('min', today);
    document.getElementsByName("start")[0].setAttribute('max','2022-12-31');
    document.getElementsByName("end")[0].setAttribute('max','2022-12-31');
  }

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

  public selectedfile =null;
  onFileSelected(event){
    
    if(event.target.files.length > 0) 
     {
       this.updateForm.patchValue({
          fileName: event.target.files[0].name,
       })
     }
    
    console.log(event);
    this.selectedfile=event.target.files[0];
    console.log(this.selectedfile.name)
    console.log(this.selectedfile)

  }

  showModal: boolean;

  setDate(string){
    return string.substr(0, string.indexOf('T'))
   
  }

  show(product){
    this.updateForm.controls['productId'].disable();
    console.log(product)
    this.showModal = true;
    console.log(product.productId)
    this.updateForm.patchValue({
      productId:product.productId,
      productName:product.productName,
      type:product.productType,
      price:product.productPrice,
      description:product.productDescription,
      startDate:product.productStartDate,
      endDate:product.productEndDate,

    });

  }

  update(){

    const formData = new FormData();
    console.log(this.updateForm)
    formData.append('productId',this.updateForm.get('productId').value);
    formData.append('productName',this.updateForm.get('productName').value)
    formData.append('type',this.updateForm.get('type').value);
    formData.append('price',this.updateForm.get('price').value);
    formData.append('description',this.updateForm.get('description').value);
    formData.append('startDate',this.updateForm.get('startDate').value);
    formData.append('endDate',this.updateForm.get('endDate').value);
    if(this.selectedfile!=null){
      formData.append('image',this.selectedfile,this.selectedfile.name);
    }
    console.log(formData)
    this.service.updateProducts(formData)
    .subscribe((res) => {
       console.log(res)
       if(res.msg === "Invalid Token"){
        localStorage.clear();
        this.route.navigate(['admin'])
      }
       if(res.msg === "Data updated Successfully"){
        this.toaster.success('Product Updated!')
        setTimeout(()=>{
          this.hide();
          this.route.navigate(['dashboard/analysis'])
        },1000)
       }
     });   
  }
  hide(){
    this.showModal = false;
  }

  showDeleteModal:boolean

  showDelete(){
    this.showDeleteModal = true;
  }

  closeModal(){
    this.showDeleteModal = false;
  }

public tempForDelete;
  delete(){
    
    let productId = {productId : this.tempForDelete.productId};
    console.log(productId);

    this.service.deleteProduct(productId)
    .subscribe((res) => {
       console.log(res)
       if(res.msg === "Invalid Token"){
        localStorage.clear();
        this.route.navigate(['admin'])
      }
      if(res.msg == "Data deleted Successfully"){
        this.toaster.success('Product deleted!')
      setTimeout(()=>{
        this.closeModal();
        this.hide();
        this.route.navigate(['dashboard/analysis'])
        },1000)
      }
     });  
  }

  getProductfordelete(product){
    this.tempForDelete = product;
  }

}
