import { Line } from "./Line";
import { Produit } from "./Produit";

export class StatisticMonth {
    id?: string;
    line?: Line;
    reference?: Produit;
    month?: string;
    date?: string;
    createdAt?: Date;
    standardHours?: number;
    totalHours?: number;
    nvah?: number;
    output?: number = 0;
    scrap?: number = 0;
    productivity?: number = 0;
    tauxScrap?: number = 0;

    constructor(
        id?: string,
        line?: Line,
        reference?: Produit,
        month?: string,
        date?: string,
        createdAt?: Date,
        standardHours?: number,
        totalHours?: number,
        nvah?: number,
        output?: number,
        scrap?: number,
        productivity?: number,
        tauxScrap?: number
    ) {
        this.id = id
        this.line = line
        this.reference = reference
        this.month = month
        this.date = date
        this.createdAt = createdAt
        this.standardHours = standardHours
        this.totalHours = totalHours
        this.nvah = nvah
        this.output = output
        this.scrap = scrap
        this.productivity = productivity
        this.tauxScrap = tauxScrap
    }
  


}