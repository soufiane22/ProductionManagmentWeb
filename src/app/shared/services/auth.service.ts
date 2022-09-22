import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient;
  requestHeadrs = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

  constructor( private userAuthService:UserAuthService ,private httpBackend: HttpBackend) { 
    this.http = new HttpClient(httpBackend);
  }

  login(data:any):Observable<any>{
    let body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);
    console.log("data ===>",data);
    console.log("url backend ======>",environment.baseurl);
    
    return this.http.post(`${environment.baseurl}login`,body,{headers:this.requestHeadrs}); //{headers:this.requestHeadrs}
  }

  public roleMatch(allowRoles):boolean{
    let isMatch = false;
    const userRoles:any = this.userAuthService.getRoles();
    
    allowRoles.forEach(role => {
      if(role === userRoles){
      isMatch = true;
    }
    
    });
    return isMatch;
    
  }
}
