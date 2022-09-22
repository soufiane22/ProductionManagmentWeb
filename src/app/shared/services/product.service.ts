import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Produit } from '../modules/Produit';
const url = environment.baseurl+"produit/"
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<any>(`${url}getAll`);
  }

  getByLine(idLine){
    return this.http.get<any>(`${url}get/line/${idLine}`);
  }

  add(product:Produit){
    return this.http.post<any>(`${url}save`,product);
  }

  delete(id){
    return this.http.delete<any>(`${url}delete/${id}`);
  }

  update(product , id){

    return this.http.put<any>(`${url}update/${id}`,product);
  }
}
