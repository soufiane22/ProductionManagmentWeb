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

  public setUserName(username){
    localStorage.setItem("userfullname",username);
  }

  public getUserName():string{
    return localStorage.getItem("userfullname");
  }

  public setFunction(Function){
    localStorage.setItem("function",Function);
  }

  public getFunction():string{
    return localStorage.getItem("function");
  }


 
}
