import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  requestHeadrs = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

  constructor(private http:HttpClient , private userAuthService:UserAuthService) { }

  login(data:any):Observable<any>{
    let body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);
    console.log("data ===>",data);
    return this.http.post(`${baseurl}login`,body,{headers:this.requestHeadrs}); //{headers:this.requestHeadrs}
  }

  public roleMatch(allowRoles):boolean{
    let isMatch = false;
    const userRoles:any = this.userAuthService.getRoles();
    if(allowRoles === userRoles){
      isMatch = true;
    }
    return isMatch;
  }
}
