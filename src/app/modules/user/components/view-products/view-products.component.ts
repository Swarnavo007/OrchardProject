import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ViewProductsService } from 'src/app/services/view-products.service';
import { Title } from '@angular/platform-browser';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent implements OnInit {
  public emptyProducts = false;
  constructor(
    private service: ViewProductsService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Icy-Licious | Shop');
  }
  public products: any = [];
  public newProducts: any = [];
  // userId:"navaneetha@gmail.com";
  showViewModal: boolean;

  encryptSecretKey = 'esrgr54gyse65tgzs56e4tg56s4rg';
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

  ontype() {
    var type = (<HTMLInputElement>document.getElementById('type')).value;
    console.log('option value' + type);
    this.newProducts = [];
    var today = new Date().toISOString().split('T')[0];
    console.log('today date:' + today);
    this.service.getProducts().subscribe((response) => {
      this.products = response;
      if (this.products.length < 1) {
        this.emptyProducts = true;
      }
      console.log('items are :' + this.products);
      for (var i = 0; i < this.products.length; i++) {
        this.products[i].productStartDate = this.setDate(
          this.products[i].productStartDate
        );
        this.products[i].productEndDate = this.setDate(
          this.products[i].productEndDate
        );
        if (
          !(this.products[i].productStartDate > today) &&
          this.products[i].productEndDate > today
        ) {
          if (this.products[i].productType == type) {
            this.newProducts.push(this.products[i]);
          }
          if (type == 'all') {
            this.newProducts.push(this.products[i]);
          }
        }
        // if(this.products[i].productEndDate > today && type=='all'){
        //   this.newProducts.push(this.products[i])
        //   console.log(this.newProducts[i]);
        // }
      }
    });
  }
  ngOnInit(): void {
    var today = new Date().toISOString().split('T')[0];
    this.service.getProducts().subscribe((response) => {
      // console.log("header:"+response.email);
      if (response) {
        this.hideloader();
      }
      this.products = response;
      if (this.products.length < 1) {
        this.emptyProducts = true;
      }
      // console.log("items are on init"+this.products);
      for (var i = 0; i < this.products.length; i++) {
        this.products[i].productStartDate = this.setDate(
          this.products[i].productStartDate
        );
        this.products[i].productEndDate = this.setDate(
          this.products[i].productEndDate
        );
        // if(this.products[i].productEndDate > today || this.products[i].productStartDate < today)
        if (
          !(this.products[i].productStartDate > today) &&
          this.products[i].productEndDate > today
        ) {
          console.log('prodyucts ');
          console.log(this.products[i]);

          this.newProducts.push(this.products[i]);

          for (let i = 0; i < this.newProducts.length; i++) {
            // var obj = {added: false};
            this.newProducts[i]['added'] = false;
          }
        }
      }
      console.log('products are ' + this.newProducts);
    });
  }
  setDate(string) {
    return string.substr(0, string.indexOf('T'));
  }

  productDetails(productId) {
    // console.log(productId);
    for (let product of this.newProducts) {
      if (product.productId == productId) {
        var email = this.decryptData(localStorage.getItem('email'));
        console.log('email:' + email);
        if (email == null) {
          // alert("u need to login first");
          this.showViewModal = true;
        } else {
          product.userId = email;
          console.log('product:' + product.userId);
          this.service.createCart(product).subscribe(() => {
            console.log('success');
            let btn = document.getElementById(
              'button' + productId
            ) as HTMLElement;
            // btn.innerHTML="Product Added";
            // btn.style.backgroundColor = "green";
            for (let i = 0; i < this.newProducts.length; i++) {
              if (this.newProducts[i].productId === productId) {
                this.newProducts[i]['added'] = true;
              }
            }
            this.router.navigate(['/shop']);
          });
        }
      }
    }
  }
  closeModal() {
    // this.showViewModal = false;
    this.router.navigate(['']);
  }
  hideloader() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('footer').style.display = 'block';
  }
}
