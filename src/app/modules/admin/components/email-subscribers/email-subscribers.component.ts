import { Component, OnInit } from '@angular/core';
import { SubscribersService } from 'src/app/services/subscribers.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-email-subscribers',
  templateUrl: './email-subscribers.component.html',
  styleUrls: ['./email-subscribers.component.scss']
})
export class EmailSubscribersComponent implements OnInit {

  constructor(private service:SubscribersService,private route:Router, private titleService:Title) {
    this.titleService.setTitle("Icy-Licious | Admin | Subscribers");
   }


  subscibers;
  ngOnInit(): void {
    this.service.getSubscibers().subscribe((response) => {
      // console.log(response)
      if(response.msg === "Invalid Token"){
        localStorage.clear();
        this.route.navigate(['admin'])
      }
      this.subscibers = response;
      // console.log(this.subscibers)
    });
  }


fileName= 'Subscribers.xlsx';
submitButton=false;
exportexcel(): void
    {
      this.submitButton=!this.submitButton;
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);


       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


       XLSX.writeFile(wb, this.fileName);

    }

}
