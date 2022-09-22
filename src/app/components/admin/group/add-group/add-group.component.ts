import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Group } from 'src/app/shared/modules/Group';
import { Line } from 'src/app/shared/modules/Line';
import { User } from 'src/app/shared/modules/User';
import { GroupService } from 'src/app/shared/services/group.service';
import { LineService } from 'src/app/shared/services/line.service';
import { UserService } from 'src/app/shared/services/user.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
  providers: [MessageService]
})




export class AddGroupComponent implements OnInit {
  selectedShift 
  options = [{ "id": "Morning", "name": "Morning" },
  { "id": "Evening", "name": "Evening" },
  { "id": "Night", "name": "Night" }];
  

  group: Group = new Group();
  
  leaders: User [] =[];
  supervisors: User [] =[];
  technicals: User [] =[];
  selectedLeader: User = new User();
  selectedSupervisor: User = new User;
  selectedTechnical:User = new User;
  lines : Line [];
  selectedLines : Line [] = [];
  selectedemployeeses : User [] = [];
  show = false
  id
  mode
  modeUpdate:Boolean = false
  modeVue = false
  groupe:Group;
  selectedZone:String = "RFID"

  constructor(private groupService:GroupService , private userService:UserService, private router:Router,private toastr: ToastrService,
     private lineService: LineService ,  private modalService: NgbModal ,  public messageService :MessageService,private activatedroute:ActivatedRoute) {
      this.selectedShift = this.options[0].name;
      this.getAllLeaders();
      this.getAllLines();
      this.getAllSupervisors();
      this.getEmployees();
      this.getAllTechnical();
      this.selectedemployeeses = []
      this.group.designation = "";
      }

  ngOnInit(): void {

    this.id=this.activatedroute.snapshot.paramMap.get("id");
  
  
    this.mode=this.activatedroute.snapshot.paramMap.get("mode");
    console.log("mode ",this.mode);
    if(this.id){
          this.modeUpdate = true;
          this.group = new Group();
          this.getGroupById(this.id);
    }
    else
    this.modeUpdate = false;
    
    if(this.mode=="vue"){
      this.modeVue = true
    }
  }


  getGroupById(id: any) {
   this.groupService.getById(id).subscribe(
    response => {

      this.group = response.data.Group
      this.selectedShift = this.group.shift

      this.selectedLeader = this.group.listOperateurs.filter(u => u.id === this.group.chefEquipe)[0];
      this.selectedSupervisor = this.group.ingenieur;
      this.selectedTechnical = this.group.technicalExpert;
      this.selectedZone = this.group.zone;
      this.selectedLines = this.group.listLine;
      this.selectedemployeeses = this.group.listOperateurs.filter(u => u.id !== this.group.chefEquipe)
    },
    error => {
      console.log("error ",error);
      this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server Error"});
    }
   )
  }

  compare(val1, val2) {
    return val1.id === val2.id;

  }

  getAllLeaders(){
    this.userService.getAllLeaders("Chef Equipe").subscribe(
      response =>{
           this.leaders = response.data1;
           this.selectedLeader = this.leaders[0]
         
      },
      error => {
             console.log("error ",error); 
             this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server Error"});
      }
    )
  }

  getAllSupervisors(){
    this.userService.getAllSupervisors().subscribe(
      response =>{
           this.supervisors = response.data1;
           this.selectedSupervisor = this.supervisors[0]
         
      },
      error => {
             console.log("error ",error); 
             this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server Error"});
      }
    )
  }

  getAllTechnical(){
    this.userService.getAllTechnical().subscribe(
      response =>{
           this.technicals = response.data1;
           this.selectedTechnical = this.technicals[0]
         
      },
      error => {
             console.log("error ",error); 
             this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server Error"});
      }
    )
  }

  getAllLines(){
    this.lineService.getAll().subscribe(
      response =>{
           this.lines = response.data1;
      },
      error => {
             console.log("error ",error); 
             this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server Error"});
      }
    )

  }

  employeeses : User [];
  selectedRows : User [];



  getEmployees(){
 
    this.userService.getAllEmployees().subscribe(
      response => {
       this.employeeses = response.data1
      },
      error =>{
         console.log("error",error);
         this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server Error"});
      }
    )
  }
  filter = new FormControl('');
  employees$: Observable<User[]>;
  listem : User[] =[]
  addemployees(){
    this.listem=[]
    this.listem.push.apply(this.listem,this.selectedRows);
    //this.selectedemployeeses= this.listem;
    this.selectedemployeeses.push.apply(this.selectedemployeeses,this.listem)
    console.log("selectedemployeeses ",this.selectedemployeeses);
    this.selectedRows = [];
    this.updateVisibility;
  }

  visible: boolean = true;
updateVisibility(): void {
  this.visible = false;
  setTimeout(() => this.visible = true, 0);
}
deleteEmployee(employee){
  this.selectedemployeeses = this.selectedemployeeses.filter(val => val.id !== employee.id);
  this.listem = this.listem.filter(val => val.id !== employee.id);

  this.updateVisibility;
}
showToast(){
  this.messageService.add({key: 'tl', severity:'success', summary: 'Success', detail: "Group saved with succcess",life: 10000});
}
  save_group(){
    if(this.selectedLines.length == 0 || this.selectedemployeeses.length ==0 || this.group.designation =="" ){

      this.messageService.add({key: 'tl', severity:'warn', summary: 'Warn', detail: "Fill in the empty fields please"});
      
    }
   
    else{
    //let sortedListOperators = this.selectedemployeeses.sort((a, b) => (a.name < b.name) ? -1 : 1);
    this.group.leaderName= this.selectedLeader.prenom+" "+this.selectedLeader.nom ;
    this.group.chefEquipe = this.selectedLeader.id;
    this.group.listLine = this.selectedLines;
    this.group.ingenieur = this.selectedSupervisor;
    this.group.shift = this.selectedShift;
    this.group.zone = this.selectedZone;
    this.group.technicalExpert = this.selectedTechnical;
    this.group.listOperateurs = this.selectedemployeeses;
    this.group.listOperateurs.push(this.selectedLeader);
    if(!this.modeUpdate){
       this.groupService.save(this.group).subscribe(
      response =>{

         this.toastr.success('', "Group saved with success", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
         this.router.navigate(['/admin/groups/list'])
            
      },
      error => {
        console.error(" error ",error);
        if(error.status == 400)
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: error.error.message});
        else
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server error"});
      }
    )
    }
    else{
      this.groupService.update(this.group).subscribe(
      response =>{
      
        this.toastr.success('', "Group updated", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
         this.router.navigate(['/admin/groups/list'])
      }
      )

      error => {
        console.log("error ====>",error);
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server Error"});
      }
    }

    }
   

  }

  onUserModal(contentDetail){
    this.open(contentDetail);
  }

  /************ Modal functions *********** */
  closeResult = '';
open(content) {
  this.modalService.open(content,{size: 'lg',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

public getDismissReason(reason: any): string {
  this.selectedRows = [];
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

/******************************** */



}
