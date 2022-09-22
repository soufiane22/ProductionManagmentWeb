import { Presence } from "./Presence";

export class PresenceGroup {
    id?: string;
    group?: string;
    shift?: string;
    date?: string;
    leaderId?: string;
    leaderName?:string;
    engineer?: string;
    totalOperators?: number;
    sumHours?: number;
    listPresence? : Presence[];

  constructor(
    id?: string, 
    group?: string, 
    shift?: string, 
    date?: string, 
    leaderId?: string, 
    leaderName?: string, 
    engineer?: string, 
    totalOperators?: number, 
    sumHours?: number, 
    listPresence?: Presence[]
) {
    this.id = id
    this.group = group
    this.shift = shift
    this.date = date
    this.leaderId = leaderId
    this.leaderName = leaderName
    this.engineer = engineer
    this.totalOperators = totalOperators
    this.sumHours = sumHours
    this.listPresence = listPresence
  }
  
}