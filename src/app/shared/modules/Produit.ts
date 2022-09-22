import { Line } from "./Line"

export class Produit {

    id?:String
    listLines?:Line[]
    designation?:string
    reference?:string
    tc?:number


  constructor(
    id?: String, 
    listLines?: Line [], 
    designation?: string, 
    reference?: string,
    tc?:number
) {
    this.id = id
    this.listLines = listLines
    this.designation = designation
    this.reference = reference
    this.tc = tc
  }

}