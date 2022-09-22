import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/shared/modules/Account';
import { User } from 'src/app/shared/modules/User';
import { AccountService } from 'src/app/shared/services/account.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
  providers: [MessageService]
})
export class AddAccountComponent implements OnInit {

  listUsers : User[];
  selectedUser:User = new User();
  listRoles ;
  account :Account = new Account();
  selecteRole
  accountForm: FormGroup;
  show = false;
  constructor(private userService:UserService , private fb: FormBuilder,  public messageService :MessageService,private router:Router,
    private accountService:AccountService, private toastr: ToastrService) { 
    this.listUsers = []
    this.listRoles = [{name:'ROLE_ADMIN'},{name:'ROLE_CONTROLER'},{name:'ROLE_LEADER'}];
    this.createAccoutForm();
 

  }

  ngOnInit(): void {
    this.show= true;
  }



  createAccoutForm(){
    this.accountForm = this.fb.group({
      user: this.fb.control({ value: this.selectedUser, disabled: false },[Validators.required]),
      username: this.fb.control({ value: '', disabled: false },[Validators.required]),
      password: this.fb.control({ value: '', disabled: false },[Validators.required]),
      roles: this.fb.control({ value: '', disabled: false },[Validators.required]),
      confirmPassword: this.fb.control({ value: '', disabled: false },[Validators.required])
    })  ;

  }

  get user() {
    return this.accountForm.get('user');
  }
  get username() {
    return this.accountForm.get('username');
  }
  get roles() {
    return this.accountForm.get('roles');
  }
  get password() {
    return this.accountForm.get('password');
  }
  get confirmPassword() {
    return this.accountForm.get('confirmPassword');
  }

  saveAccount(){
    if (this.accountForm.valid){
      if(!(this.accountForm.get('password').value == this.accountForm.get('confirmPassword').value )){
        this.messageService.add({key: 'tl', severity:'warn', summary: 'Warn', detail: "The two passwords are not compatible"});
        // console.log("password ",this.accountForm.get('password').value);
        // console.log("confirmpassword ",this.accountForm.get('confirmPassword').value);
      }else{
     
        this.account.user = this.user.value;
        this.account.roles = this.accountForm.get('roles').value;
        this.account.username = this.accountForm.get('username').value;
        this.account.password = this.accountForm.get('password').value;
        console.log("account  ",this.account);
        this.accountService.save(this.account).subscribe(
          response =>{
            this.toastr.success('', "Account saved with success", {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
             this.router.navigate(['/admin/accounts/list']). then(()=>{
              this.messageService.add({key: 'tl', severity:'success', summary: 'Success', detail: "Account saved with success"});
         })
          },
          error => {
            console.error("server error ",error);
            if(error.status == 400)
            this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: error.error.message});
            else
            this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server error"});
          
          }
              
          
        )
  
        
      }
    
    }else{
      this.messageService.add({key: 'tl', severity:'warn', summary: 'Warn', detail: "Fill in the empty fields please"});
    }
   
    
  }

  onFunctionSelected(event){
    this.show= false;
    this.userService.getAllLeaders(event.value).subscribe(
      response =>{
        console.log(event.value, response);
        this.listUsers = response.data1;
        this.show= true;
      },
      error =>{
         console.log("error ",error);
         this.show= true;
      }
    )
    
  }

}
