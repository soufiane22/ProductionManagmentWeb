import { Line } from "./Line";


export class User{
    id?:string;
    username?:string;
    password?:string;
    nom?:string;
    prenom?:string;
    tele?:string;;
    fonction?:string;;
    email?:string;
    line?:Line;
    matricule?:number;
    roles?:string [];
}