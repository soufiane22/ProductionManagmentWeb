import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
  localStorage.setItem("roles",JSON.stringify(roles));
  }

  public getRoles():[]{
    return JSON.parse(localStorage.getItem("roles"));
  }

  public setToken(jwtToken:string){
    localStorage.setItem("token",jwtToken);
  }

  public getToken():string{
    return localStorage.getItem("token");
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn():boolean{
    return this.getToken() != null;
  }

 
}
