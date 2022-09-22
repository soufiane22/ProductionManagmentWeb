import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/shared/modules/User';
import { LineService } from 'src/app/shared/services/line.service';
import { UserService } from 'src/app/shared/services/user.service';
import * as FileSaver from 'file-saver';
import {cloneDeep} from 'lodash';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [MessageService ,ConfirmationService]
})
export class ListUsersComponent implements OnInit {
  show = false;
  listUsers: User[];
  totalEmployeese:number = 0
  constructor(private userService: UserService , public messageService :MessageService ,private confirmationService:ConfirmationService, 
    private router:Router) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    const now = new Date();
    console.log("now ",now);
    console.log("now.toLocaleString() ",now.toLocaleString()); 
    console.log("now.toISOString() ",now.toISOString());
  }

  getAllUsers() {
    this.show = false;
    this.userService.getAll().subscribe(
      response => {
        this.listUsers = response.data1;
        this.totalEmployeese = this.listUsers.length;
        this.show = true;
      },
      error => {
        console.log("error", error);
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" });
        this.show = true;
      }
    )
  }

  filteredValues
  onFilter(event , dt){
    this.filteredValues = event.filteredValue; 
    this.totalEmployeese = this.filteredValues.length
  }


  onEditUser(account){
   this.router.navigate(['admin/users/add',account.id])

  }

  /********************* Exporting Excel functions ********************** */
  listUsersFile
  exportExcel(){
    this.listUsersFile = []
    this.listUsersFile = cloneDeep(this.listUsers);  
    this.listUsersFile.forEach(p=>{
      p.line = p.line.designation;
    })

    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listUsersFile);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Effectif");
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
/****************************************************************** */

  deleteUser(user){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listUsers = this.listUsers.filter(val => val.id !== user.id);
        this.userService.delete(user.id).subscribe(
          success => {
            console.log("success ", success);
            this.messageService.add({ key: 'tl', severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
          },
          error => {
            console.log("error ", error);
            this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Server error', life: 3000 });
          }
        )

      }
    });
    
  }
}



