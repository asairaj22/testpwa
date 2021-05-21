import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'testpwa';
  articles: any = [];
  userpagedata: number = 2;
  constructor(private apiService: ApiService, private swUpdate: SwUpdate) { }

  ngOnInit() {
    console.log(this.swUpdate)
    if (this.swUpdate.isEnabled) {
      console.log(this.swUpdate.isEnabled)
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
        // if(confirm("New version available. Load New Version?")) {
        //   window.location.reload();
        // }
      });
    } 


    this.apiService.getNews(this.userpagedata).subscribe((data: any)=>{
      console.log(data);
      this.articles = data.data;
    });

    this.apiService.getUnknown(this.userpagedata).subscribe((data: any)=>{
      console.log(data);
    });

  }

}
