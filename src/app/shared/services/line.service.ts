import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Line } from '../modules/Line';
const url = environment.baseurl+"line/"
@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${url}getAll`);
  }

  save(line:Line){
    return this.http.post<any>(`${url}save`,line);
  }

  update(line:Line){
    console.log("line ",line);
    
    return this.http.put<any>(`${url}update/${line.id}`,line);
  }
  
  delete(id){
    return this.http.delete<any>(`${url}delete/${id}`);
  }

  
}
