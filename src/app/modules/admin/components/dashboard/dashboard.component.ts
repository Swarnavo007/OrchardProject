import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../../services/dashboard.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public orders:any;
  public emailSubscribers:any;
  public products:any;
  public users:any;
  constructor(private service:DashboardService, private route:Router, private titleService:Title) {
    this.titleService.setTitle("Icy-Licious | Admin | Dashboard");
   }


   navigateOrderPage(){
    this.route.navigate(['./dashboard/orders'])
  }

  navigateProductPage(){
    this.route.navigate(['./dashboard/view-product'])
  }

  navigateSubscribersPage(){
    this.route.navigate(['./dashboard/subscibers'])
  }

  ngOnInit(): void {
    //emailSubscribers
    let res=this.service.getEmailSubscribers();
    // res.subscribe((data)=>console.log(data)
    res.subscribe((response)=>{
      if(response.msg === "Invalid Token"){
        localStorage.clear();
        this.route.navigate(['admin'])
      }
    })
    res.subscribe((data)=>this.emailSubscribers=data);
    //orders
    let response=this.service.getOrders();
    // response.subscribe((data)=>console.log(data));
    response.subscribe((data)=>this.orders=data);
    response.subscribe((res)=>{
      if(res.msg === "Invalid Token"){
        localStorage.clear();
        this.route.navigate(['admin'])
      }
    })
    //products
    let product=this.service.getProducts();
    // product.subscribe((data)=>console.log(data));
    product.subscribe((response)=>{
      if(response.msg === "Invalid Token"){
        localStorage.clear();
        this.route.navigate(['admin'])
      }
    })
    product.subscribe((data)=>this.products=data);


    

    let users = this.service.getUsersCount();
    users.subscribe((response)=>{
      if(response.msg === "Invalid Token"){
        localStorage.clear();
        this.route.navigate(['admin'])
      }
    })
    users.subscribe((data)=>this.users=data);
  }

}
