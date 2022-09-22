import { Line } from "./Line";

export class Presence {
    id?: string;
    idPerson?: string;
    nomPerson?: string;
    prenomPerson?: string;
    matriculePerson?: string;
    functionPerson?: string;
    etat?: string;
    nbrHeurs?: number;
    line?: Line;

  constructor(
    id?: string, 
    idPerson?: string, 
    nomPerson?: string, 
    prenomPerson?: string, 
    matriculePerson?: string, 
    functionPerson?: string, 
    etat?: string, 
    nbrHeurs?: number, 
    line?: Line
) {
    this.id = id
    this.idPerson = idPerson
    this.nomPerson = nomPerson
    this.prenomPerson = prenomPerson
    this.matriculePerson = matriculePerson
    this.functionPerson = functionPerson
    this.etat = etat
    this.nbrHeurs = nbrHeurs
    this.line = line
  }

}