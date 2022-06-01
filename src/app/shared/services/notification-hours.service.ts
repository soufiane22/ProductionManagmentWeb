import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UserAuthService } from './user-auth.service';
const url = baseurl+"notification_heures/"
@Injectable({
  providedIn: 'root'
})
export class NotificationHoursService {

  constructor(private http:HttpClient , private userAuthService :UserAuthService) { }
  token:string = this.userAuthService.getToken();

   headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': 'test token',
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

    console.log("this.token =====>",this.token);
     return this.http.get<any>( `${url}getAll`,this.httpOptions); //{headers:requestHeadrs}  `${baseurl}user/test`
  }

 
}
