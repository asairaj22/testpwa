import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getNews(num: number){
    return this.httpClient.get(`https://reqres.in/api/users?page=`+num);
  }

  getUnknown(num: number){
    return this.httpClient.get(`https://reqres.in/api/unknown/`+num);
  }

  getDelay(num: number){
    return this.httpClient.get(`https://reqres.in/api/users?delay=`+num);
  }

}


