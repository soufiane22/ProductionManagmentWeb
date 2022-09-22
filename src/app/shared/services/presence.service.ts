import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { PresenceGroup } from '../modules/Presence-Goup';

const url_presenceGroup = environment.baseurl+"presencegroup/"
const url_presence = environment.baseurl+"presence/"
@Injectable({
  providedIn: 'root'
})

export class PresenceService {

  constructor(private http:HttpClient) {
   }

   getByDate(date){
     return this.http.get<any>(`${url_presenceGroup}getbydate/${date}`)
   }

   update(id,presence){
     return this.http.put<any>(`${url_presenceGroup}updatestatus/${id}`,presence)
   }


   getBetweenDates(startDate,endDate){
    return this.http.get<any>(`${url_presenceGroup}getbetween/${startDate}/${endDate}`)
   }

   getPresenceByDate(Date){
    return this.http.get<any>(`${url_presence}getbydate/${Date}`)
   }
}
