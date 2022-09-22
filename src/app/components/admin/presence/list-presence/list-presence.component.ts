import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbCalendar, NgbDate , NgbDateParserFormatter, NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { MessageService, SelectItem } from 'primeng/api';
import { PresenceGroup } from 'src/app/shared/modules/Presence-Goup';
import { PresenceService } from 'src/app/shared/services/presence.service';
import  {ToastModule} from  'primeng/toast';
import { Presence } from 'src/app/shared/modules/Presence';
import * as FileSaver from 'file-saver';
import {cloneDeep} from 'lodash';
import { Line } from 'src/app/shared/modules/Line';
import { LineService } from 'src/app/shared/services/line.service';

@Component({
  selector: 'app-list-presence',
  templateUrl: './list-presence.component.html',
  styleUrls: ['./list-presence.component.css'],
  providers: [MessageService]
})
export class ListPresenceComponent implements OnInit {
  of
  fromDate: NgbDate | null;
  dateString
  show = false
  statuses: SelectItem[];
  editing = false
  active = 1
  lines : Line [] = []
  selectedLine
  clonedPresence : { [s: string]: PresenceGroup; } = {};

  constructor(public formatter: NgbDateParserFormatter ,private calendar: NgbCalendar, private presenceService:PresenceService,
    public messageService :MessageService ,private lineService:LineService) { 
    this.fromDate = this.calendar.getToday();
    this.statuses = [{label: 'Validate', value: 'Validate'},{label: 'Invalidate', value: 'Invalidate'}];
    this.getAllLines();
  }

  ngOnInit(): void {

    this.dateString = this.fromDate.year+"-"+this.fromDate.month+"-"+this.fromDate.day;
    console.log("dateString ",this.dateString);
    this.getByDate(this.dateString);
    this.getPresenceByDate(this.dateString);
  }

  onDateSelection(date){
    console.log(date);
    // this.dateString = date.year+"-"+date.month+"-"+date.day;

    this.dateString = date.year+"-"+date.month+"-"+date.day;
    console.log("dateString",this.dateString);
    this.getByDate(this.dateString)
  }

  getAllLines(){
    this.show = true
    this.lineService.getAll().subscribe(
      response =>{
           this.lines = response.data1;
           this.show = false
      },
      error => {
             console.log("error ",error); 
             this.show = false
             this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" });
      }
    )
  }

  listIndividualPresenceClone
  filterByline(){
     if(this.listIndividualPresence != null)
    this.listIndividualPresence = this.listIndividualPresenceClone.filter(p => p.line.id == this.selectedLine[0])
    this.calculateTotal(this.listIndividualPresence)
    
  }
  listPresencesGroup: PresenceGroup []
  getByDate(dateString: any) {
    this.selectedLine = []
    this.show = false
   this.presenceService.getByDate(dateString).subscribe(
     response =>{
       this.listPresencesGroup = response.data1
       console.log("list presence ",this.listPresencesGroup);
       if(this.listPresencesGroup.length==0){
        this.show = true
        console.log("show message");
         this.showMessage('No Declaration found in this date')
       }
  
       this.show = true
     },
     error => {
       console.log("error ",error);
       this.show = true
     }
   )
 }

 showMessage(message){
  this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: message});
  }


  /********************** Individual presences***********************/
  startDate=""
onStarDateSelection(date){
  this.selectedLine =[]
  this.startDate = date.year+"-"+date.month+"-"+date.day
    console.log("startDate ",this.startDate);
    this.getPresenceByDate(this.startDate)
}
endDate
onEndDateSelection(date){
  this.selectedLine =[]
  this.endDate = date.year+"-"+date.month+"-"+date.day;
  console.log("End Date ",this.endDate);
  if(this.startDate != "" )
  this.getPresenceBetweenTwoDates(this.startDate ,this.endDate)
  else
  this.showMessage('Select start date please!')
}

/***************** get individual presence between two date ******************/
listIndividualPresence : Presence[] = []
list : Presence[] = []
listGroups : PresenceGroup []
  getPresenceBetweenTwoDates(startDate: any, endDate: any) {
    this.list = []
    this;this.listGroups = []
    this.listGroups = []
    this.show = false
    this.presenceService.getBetweenDates(startDate,endDate).subscribe(
      response => {
        this.listGroups = response;
      
        console.log("listGroups ",this.listGroups );
        if(this.listGroups.length == 0){
          this.messageService.add({key: 't2', severity:'info', summary: 'Info', detail: "No declaration found between those date!"});
         }else{
          this.listGroups.forEach(group =>{ this.list.push.apply(this.list,group.listPresence) })
          this.listIndividualPresence = this.list
          this.listIndividualPresenceClone = cloneDeep(this.listIndividualPresence);  
          this.messageService.add({key: 't2', severity:'success', summary: 'Success', detail: "Declarations retrieved"});
          this.calculateTotal(this.listIndividualPresence)
         }
         console.log("listIndividualPresence ",this.listIndividualPresence );
        
         this.show = true
      },
      error =>{
        this.show = true
        console.log("error ",error);
        this.messageService.add({key: 't2', severity:'error', summary: 'Error', detail: "Server error"});
      }
    )
  
  }



  getPresenceByDate(date){
    this.listGroups = []
    this.list = []
    this.presenceService.getByDate(date).subscribe(
      response =>{
        this.listGroups= response.data1;

        if(this.listGroups.length==0){
         this.show = true
         this.messageService.add({key: 't2', severity:'info', summary: 'Info', detail: "No declaration found in this date!"});
        }else{
          this.messageService.add({key: 't2', severity:'success', summary: 'Success', detail: "Declarations retrieved"});
          this.listGroups.forEach(group =>{
            this.list.push.apply(this.list,group.listPresence)
          })
          this;this.listIndividualPresence = this.list
          this.listIndividualPresenceClone = cloneDeep(this.listIndividualPresence);  
          this.calculateTotal(this.listIndividualPresence)
        }
        this.show = true
      },
      error => {
        console.log("error ",error);
        this.show = true
      }
    )

  }

  filteredValues
  onFilter(event , dt){
    this.filteredValues = event.filteredValue; 
   this.calculateTotal(this.filteredValues)
  }

  totalHours:number = 0
  totalEmployeese:number = 0
  calculateTotal(rows){
    this.totalEmployeese = rows.length
    this.totalHours = 0
    rows.forEach(list => {
      this.totalHours += list.nbrHeurs;
    });
    this.totalHours.toFixed(2);
    console.log("tofixed ", this.totalHours.toFixed(2));
    
     return this.totalHours.toFixed(2);
  }


  onRowEditInit(presence){
    this.clonedPresence[presence.id] = {...presence};
  }
  onRowEditSave(presence){
    delete this.clonedPresence[presence.id];
    console.log("presences ",presence);
    this.presenceService.update(presence.id , presence).subscribe(
      response => {
         console.log("response ",response);
         this.messageService.add({severity:'success', summary: 'Success', detail:'Status is updated'});
         
      },
      error =>{
        console.log("error ",error);
        this.messageService.add({severity:'error', summary: 'Error', detail:'Server Error'});
      }
    )
  
    
    
  }
  
  onRowEditCancel(notif, ri){
    // this.products2[index] = this.clonedProducts[product.id];
    //       delete this.clonedProducts[product.id];
  
  }


    /********************* Exporting Excel functions ********************** */

  listPresenceFile :any [] = new Array()  
 // listTransfer :any [] 
  exportExcel(){
    this.listPresenceFile = []
    this.listPresenceFile = cloneDeep(this.listIndividualPresence);  
    
    console.log("listPresenceFile ",this.listPresenceFile);
    
    this.listPresenceFile.forEach(p=>{
      p.leader = p.leader.nom +" "+ p.leader.prenom
      p.supervisor = p.supervisor.nom
      p.technicalExpert = p.technicalExpert.nom
      p.line = p.line.designation
    })


    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listPresenceFile);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Presence");
  });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().toISOString() + EXCEL_EXTENSION);
}

 /************************************************** */

}


