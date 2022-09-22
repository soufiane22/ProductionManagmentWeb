import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


const url = environment.baseurl+"statisticMonth/"

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http:HttpClient) { }

  getBetweenDates(startDate , endDate ,type){
    return this.http.get<any>(`${url}getbymonth/${startDate}/${endDate}/${type}`)

  }

  getByReferences(year,id,type){
    return this.http.get<any>(`${url}get/reference/${year}/${id}/${type}`)
  }

  getByLineAndMonth(id,month){
    return this.http.get<any>(`${url}get/line/${id}/${month}`)
  }

  getByRefAndMonth(id,month){
    return this.http.get<any>(`${url}get/reference/${id}/${month}`)
  }

  getByMonthAndType(month,type){
    return this.http.get<any>(`${url}get/month/${month}/${type}`)
  }
}
