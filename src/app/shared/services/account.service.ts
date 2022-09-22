import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const url = environment.baseurl+"account/"
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  save(account){
    return this.http.post<any>(`${url}save`,account)
  }
  getAll(){
    return this.http.get<any>(`${url}getAll`)
  }

  updatePassword(account){
    return this.http.put<any>(`${url}updatepassword`,account)
  }
  delete(id: any) {
    return this.http.delete<any>(`${url}delete/${id}`)
  }
}

