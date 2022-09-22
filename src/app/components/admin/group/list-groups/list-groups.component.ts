import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/shared/services/group.service';
import { GroupModule } from '../group.module';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Group } from 'src/app/shared/modules/Group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.css'],
  providers: [MessageService ,ConfirmationService]
})
export class ListGroupsComponent implements OnInit {
  show = true
  listGroups: Group[];
  constructor(private groupService:GroupService , private confirmationService: ConfirmationService,
    private messageService :MessageService, private router:Router ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.show = false
     this.groupService.getAll().subscribe(
       response =>{
         this.listGroups = response.data1;

         this.show = true
       },
       error => {
        console.log("error ",error);
        this.show = true
       }
     )
  }
  
deleteGroup(group){
    this.confirmationService.confirm({
    message: 'Are you sure you want to delete this group?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.listGroups = this.listGroups.filter(val => val.id !== group.id);
      this.groupService.delete(group.id).subscribe(
        success =>{
          console.log("success ",success);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Group Deleted', life: 3000});
        },
        error =>{
          console.log("error ",error);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Server error', life: 3000});
        }
      )
   

    }
});
}

onEditGroup(group){
  this.router.navigate(['admin/groups/add',group.id])
}
consultGroup(group){
  this.router.navigate(['admin/groups/vue',group.id,"vue"])
}


}
