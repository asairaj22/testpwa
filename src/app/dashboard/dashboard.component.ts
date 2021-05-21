import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  delayData: any = [];
  userpagedata: number = 2;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getDelay(this.userpagedata).subscribe((data: any)=>{
      console.log(data);
      this.delayData = data.data;
    });

    this.apiService.getUnknown(this.userpagedata).subscribe((data: any)=>{
      console.log(data);
    });

  }

}