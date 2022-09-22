import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
const url = environment.baseurl+"groupe/"

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) {}

  getAll(){
   return this.http.get<any>(`${url}getAll`);
  }

  getById(id){
    return this.http.get<any>(`${url}get/${id}`);
   }

  save(group){
    return this.http.post<any>(`${url}save`,group)
  }

  delete(id){
    return this.http.delete(`${url}delete/${id}`);
  }

  update(group){
    return this.http.put<any>(`${url}update/${group.id}`,group)
  }

 
}
