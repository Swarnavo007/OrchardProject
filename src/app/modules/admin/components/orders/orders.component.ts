import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {OrdersService} from '../../../../services/orders.service'
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderId:any;
  activeOrders:any=[];
  deliveredOrders:any=[];
  orders:any=[];
  order:any=[];
  constructor(private httpClient:HttpClient,private router:Router,
    private service:OrdersService,private toaster:ToastrService, private titleService:Title) { 
    
      this.titleService.setTitle("Icy-Licious | Admin | Orders");
  }
 
  ngOnInit(): void {
    this.service.getOrdersList().subscribe((response) => {
      if(response.msg === "Invalid Token"){
        localStorage.clear();
        this.router.navigate(['admin'])
      }
      this.orders = response;
      // console.log(this.orders);
      for(let ord of this.orders){
        if(ord.status=="ordered"){
          this.activeOrders.push(ord);
        }
        else if(ord.status=="Delivered"){
          this.deliveredOrders.push(ord);
        }
      }
    });
  }
  

  getDate(date:any){
    let newDate = date.substring(0,10)
    return newDate
  }
  getOrderId(orderId:any){
    // console.log(this.orders)
    this.orderId=orderId;
    // console.log(orderId)
    for(let i of this.orders){
      if(i._id==orderId){
        this.order = i;
        //console.log(this.order);
      }
    }
    // console.log(this.order);
  }

  setOrderId(id:any){
    this.orderId=id;
  }

  setStatus(status:any){
    // console.log(status);
    // console.log(this.orderId);
    this.service.setStatus(this.orderId,status)
    .subscribe(
        (val) => {
          if(val.msg === "Invalid Token"){
            localStorage.clear();
            this.router.navigate(['admin'])
          }
            // console.log("PATCH call successful value returned in body", val);
            // console.log("statusbtn"+this.orderId)
            let btn = document.getElementById("statusbtn"+this.orderId) as HTMLElement
            btn.innerHTML="Delivered";
            btn.style.backgroundColor = "green";
            this.closeplaceOrder()
            this.toaster.success('Order Delivered!')
            setTimeout(()=>{
              this.router.navigate(['dashboard/analysis'])
            },2000)
        },
        response => {
            console.log("PATCH call in error", response);
         })
  }


  showViewModal: boolean;
  submitButton=false;
  showView() {
    this.submitButton=!this.submitButton;
    this.showViewModal = true;
  }

  closeModal() {
    this.submitButton=!this.submitButton;
    this.showViewModal = false;
  }


  showPlaceOrder:boolean;

  shoPlace(){
    this.submitButton=!this.submitButton;
    this.showPlaceOrder = true;
  }
  closeplaceOrder(){
    this.submitButton=!this.submitButton;
    this.showPlaceOrder = false;
  }

}
