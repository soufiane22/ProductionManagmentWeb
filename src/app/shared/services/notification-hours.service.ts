import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';
import { UserAuthService } from './user-auth.service';
const url = environment.baseurl+"notification_heures/"
@Injectable({
  providedIn: 'root'
})
export class NotificationHoursService {

  constructor(private http:HttpClient , private userAuthService :UserAuthService) { }
  token:string = this.userAuthService.getToken();

   headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': this.token,
     'X-Requested-With':'XMLHttpRequest'})
  
      httpOptions = {
      headers: this.headers_object
    };

  requestHeadrs = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  getAllnotofications(): Observable<any>{
    const headers = new HttpHeaders();
    //let tokenParse = JSON.parse(token)             
    headers.append('Content-Type', 'application/json'); 
    headers.append('Authorization' ,this.token);//'Bearer '+
    headers.append('X-Requested-With','XMLHttpRequest')
    
    const requestHeadrs = new HttpHeaders().set('Authorization',this.token).set('Content-Type', 'application/json')

     return this.http.get<any>( `${url}getAll`); //{headers:requestHeadrs}  `${baseurl}user/test`
  }

  getNotifsHoursByDate(date){
    return this.http.get<any>( `${url}getbydate/${date}`);
  }
  getNotifsHoursByOf(of){
    return this.http.get<any>(`${url}getbyof/${of}`);
  }

  getNotifsHoursBeteenTowDates(startDate,endDate){
    return this.http.get<any>(`${url}getbetween/${startDate}/${endDate}`);
  }



  updateNotification(notif, id){
    return  this.http.put<any>(`${url}update/${id}`,notif);
  }

  getNotifsHoursBeteenTowDatesByLine(startDate,endDate,idLine){
    return this.http.get<any>(`${url}getbetween/line/${startDate}/${endDate}/${idLine}`);
  }

  getNotifsHoursBeteenTowDatesByProduct(startDate,endDate,idProduct){
    return this.http.get<any>(`${url}getbetween/product/${startDate}/${endDate}/${idProduct}`);
  }
 
}
