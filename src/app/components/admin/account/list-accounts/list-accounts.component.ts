import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Account } from 'src/app/shared/modules/Account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css'],
  providers: [MessageService ,ConfirmationService]
})
export class ListAccountsComponent implements OnInit {
  show = false
  listAcounts : Account [];
  display: boolean = false;
  editAccountForm: FormGroup;
  constructor(private accountService:AccountService ,  public messageService :MessageService, private fb:FormBuilder,private confirmationService: ConfirmationService,) { 
    this.getAllAccounts();
  }

  ngOnInit(): void {
    this.editAccountForm = this.fb.group({
      password: this.fb.control({ value: '', disabled: false },[Validators.required]),
      confirmPassword: this.fb.control({ value: '', disabled: false },[Validators.required])
    })

  }
  get password() {
    return this.editAccountForm.get('password');
  }
  get confirmPassword() {
    return this.editAccountForm.get('confirmPassword');
  }
  
  getAllAccounts(){
    this.show = false;
    this.accountService.getAll().subscribe(
    response =>{
      console.log("response ",response);
      this.listAcounts = response.data1;
      this.show = true;
    },
    error =>{
      console.log("error",error);
      this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server error"});
      this.show = true;
    }
    )
  }
  deleteaccount(account){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this account?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listAcounts = this.listAcounts.filter(val => val.id !== account.id);
        this.accountService.delete(account.id).subscribe(
          success =>{
            console.log("success ",success);
            this.messageService.add({key: 'tl',severity:'success', summary: 'Successful', detail: 'Account Deleted', life: 3000});
          },
          error =>{
            console.log("error ",error);
            this.messageService.add({key: 'tl',severity:'error', summary: 'Error', detail: 'Server error', life: 3000});
          }
        )
     
  
      }
  });

  }
  accountSelected: Account
  onEditAccount(account){
    this.accountSelected = account
    this.display = true;
  }
  editpassword(){
    if (this.editAccountForm.valid){
      console.log("naw password ",this.password.value);
      
      if(!(this.editAccountForm.get('password').value == this.editAccountForm.get('confirmPassword').value )){
        this.messageService.add({key: 'tl', severity:'warn', summary: 'Warn', detail: "The two passwords are not compatible!"});
      }else{
        this.accountSelected.password = this.password.value;
        console.log("account selected ",this.accountSelected);
        this.accountService.updatePassword(this.accountSelected).subscribe(
          response =>{
            console.log('response',response);
            this.messageService.add({key: 'tl', severity:'success', summary: 'Success', detail: "The passwords is updated with success"});
            this.display = false;
          },
          error =>{
            console.log('error ',error);
            this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server error!"});
          }
        )
        
      }

    }else{
      this.messageService.add({key: 'tl', severity:'warn', summary: 'Warn', detail: "Fill in the empty fields please"});
    }
  }

  


}
