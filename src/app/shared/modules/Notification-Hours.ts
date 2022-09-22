import { Line } from "./Line";
import { Produit } from "./Produit";

export class NotificationHours {
    id?: string;
    of?: number;
    produit?: Produit;
    ligne?: Line;
    idLeader?: string;
    leaderName?:string;
    shift?: string;
    date?: string;
    remark?: string;
    nbr_operateurs?: number;
    total_h?: number;
    h_sup?: number
    h_devolution?: number
    h_nouvau_projet?: number
    h_arrete?: number
    h_normal?: number
    status?:string
    standar_hours?:number
    totalOutput?:number
    totalScrap?:number
    productivity?:number
    scrapRatio?:number
    createdAt?:string


  constructor(
    id?: string, 
    of?: number, 
    produit?: Produit, 
    ligne?: Line, 
    idLeader?: string, 
    leaderName?: string, 
    shift?: string, 
    date?: string, 
    remark?: string, 
    nbr_operateurs?: number, 
    total_h?: number, 
    h_sup?: number, 
    h_devolution?: number, 
    h_nouvau_projet?: number, 
    h_arrete?: number, 
    h_normal?: number, 
    status?: string, 
    standar_hours?: number, 
    productivity?: number, 
    scrapRatio?: number
) {
    this.id = id
    this.of = of
    this.produit = produit
    this.ligne = ligne
    this.idLeader = idLeader
    this.leaderName = leaderName
    this.shift = shift
    this.date = date
    this.remark = remark
    this.nbr_operateurs = nbr_operateurs
    this.total_h = total_h
    this.h_sup = h_sup
    this.h_devolution = h_devolution
    this.h_nouvau_projet = h_nouvau_projet
    this.h_arrete = h_arrete
    this.h_normal = h_normal
    this.status = status
    this.standar_hours = standar_hours
    this.productivity = productivity
    this.scrapRatio = scrapRatio
  }


    
}