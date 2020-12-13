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
    this.router.navigate(['login'])
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

  showDelete(){
    this.showDeleteModal = true;
  }

  closeModal(){
    this.showDeleteModal = false;
  }


}
