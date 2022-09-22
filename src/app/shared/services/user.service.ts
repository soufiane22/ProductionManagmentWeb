import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User } from '../modules/User';
const url = environment.baseurl+"user/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
   }

   getAllLeaders(func){
    return this.http.get<any>(`${url}get/function/${func}`);
  }

  getAllSupervisors(){
    return this.http.get<any>(`${url}get/function/Superviseur`);
  }

  getAllTechnical(){
    return this.http.get<any>(`${url}get/function/Technical Expert`);
  }

  getAllEmployees(){
    return this.http.get<any>(`${url}getAll`);
  }

  getStatistics(){
    return this.http.get<any>(`${url}get/statistics`);
  }

  getAll(){
    return this.http.get<any>(`${url}getAll/`);
  }

  getById(id){
    return this.http.get<any>(`${url}get/${id}`);
  }


  save(user:User){
    user.line = user.line[0];
    console.log("user to save ",user);
    
    return this.http.post<any>(`${url}save/`,user);
  }

  delete(id){
    return this.http.delete<any>(`${url}delete/${id}`);
  }

  update(id,user){
    user.line = user.line[0];
    console.log("user to update",user);
    return this.http.put<any>(`${url}update/${id}`,user);
  }

  

}
