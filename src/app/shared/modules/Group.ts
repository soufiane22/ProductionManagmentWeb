import { Line } from "./Line";
import { User } from "./User";

export class Group {
    id?: string;
    designation?: string;
    shift?: string;
    chefEquipe?: string;
    leaderName?: string;
    ingenieur? :User;
    technicalExpert?: User;
    zone: String;
    passwordGroup: String="";
    listLine? : Line [];
    listOperateurs? : User [];

  constructor(
    id?: string, 
    designation?: string, 
    shift?: string, 
    chefEquipe?: string, 
    leaderName?: string, 
    ingenieur?: User, 
    listLine?: Line [], 
    listOperateurs?: User []
) {
    this.id = id
    this.designation = designation
    this.shift = shift
    this.chefEquipe = chefEquipe
    this.leaderName = leaderName
    this.ingenieur = ingenieur
    this.listLine = listLine
    this.listOperateurs = listOperateurs
  }

}
