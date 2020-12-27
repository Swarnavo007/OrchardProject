import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  logout(){
    this.router.navigate(['admin'])
    localStorage.removeItem('logged');
    localStorage.removeItem('userToken');
  }

// display = "none";
  
// openModal() {
//     this.display = "block";
//   }
//   onCloseHandled() {
//     this.display = "none";
//   }


  showDeleteModal:boolean

  showDelete(){
    this.showDeleteModal = true;
  }

  closeModal(){
    this.showDeleteModal = false;
  }


}
