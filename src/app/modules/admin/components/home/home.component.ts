import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private titleService:Title) {
    this.titleService.setTitle("Icy-Licious | Admin | Dashboard");
   }

  ngOnInit(): void {
  }

 submitButton=false;
  logout(){
    this.submitButton=!this.submitButton
    this.router.navigate(['admin'])
    localStorage.removeItem('logged');
    localStorage.removeItem('token');
  }

// display = "none";
  
// openModal() {
//     this.display = "block";
//   }
//   onCloseHandled() {
//     this.display = "none";
//   }


  showDeleteModal:boolean
  deleteButton=false
  showDelete(){
    this.deleteButton=!this.deleteButton
    this.showDeleteModal = true;
  }

  closeModal(){
    this.submitButton=!this.submitButton
    this.showDeleteModal = false;
  }


}
