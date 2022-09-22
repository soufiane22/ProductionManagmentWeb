import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MessageService } from 'primeng/api';
import { Line } from 'src/app/shared/modules/Line';
import { LineService } from 'src/app/shared/services/line.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/modules/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [MessageService ]
})
export class AddUserComponent implements OnInit {

show = false;
userForm: FormGroup;
lines : Line [] = []
id
modeUpdate: Boolean = false;
user : User;

  constructor(private formBuilder:FormBuilder, private messageService:MessageService,private lineService:LineService,
    private userService:UserService , private router : Router, private toastr: ToastrService , private activatedroute:ActivatedRoute) { 
    this.createUserForm();
    this.getAllLines();
  }

  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.paramMap.get("id");
    console.log("user id ",this.id);
    if(this.id){
          this.modeUpdate = true;
          this.getUserById(this.id);
    }

    else
    this.modeUpdate = false;
  
  }

  createUserForm(){
    this.userForm = this.formBuilder.group({
      nom : this.formBuilder.control({ value: "", disabled: false },[Validators.required]),
      prenom : this.formBuilder.control({ value: "", disabled: false },[Validators.required]),
      matricule : this.formBuilder.control({ value: "", disabled: false },[Validators.required]),
      fonction : this.formBuilder.control({ value: "", disabled: false },[Validators.required]),
      tele : this.formBuilder.control({ value: "", disabled: false },[Validators.required]),
      email : this.formBuilder.control({ value: "", disabled: false },[Validators.email]),
      line : this.formBuilder.control({ value: "" ,disabled: false },[Validators.required]),
    })
  }

  getUserById(id){
    this.userService.getById(id).subscribe(
      response => {
        this.user = response.data.User;
        //console.log("user by id ",this.user);
        this.setUserForm();
      },
      error => {
        console.log("error ",error);
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" });
      }
    )
  }

  listLine:Line[]
  setUserForm(){
    this.listLine = this.lines.filter(val => val.designation == this.user.line);
   // console.log("listLine ",this.listLine);
    
    this.userForm.controls['nom'].setValue(this.user.nom)
    this.userForm.controls['prenom'].setValue(this.user.prenom)
    this.userForm.controls['matricule'].setValue(this.user.matricule)
    this.userForm.controls['fonction'].setValue(this.user.fonction)
    this.userForm.controls['tele'].setValue(this.user.tele)
    this.userForm.controls['email'].setValue(this.user.email)
    if(this.user.line && this.listLine.length > 0)
    this.userForm.controls['line'].setValue([this.user.line])
  }

  get nom() {
    return this.userForm.get('nom');
  }

  get prenom() {
    return this.userForm.get('prenom');
  }
  get matricule() {
    return this.userForm.get('matricule');
  }
  get fonction() {
    return this.userForm.get('fonction');
  }
  get tele() {
    return this.userForm.get('tele');
  }
  get email() {
    return this.userForm.get('email');
  }
  get line() {
    return this.userForm.get('line');
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

  saveUser(){
    console.log("user function", this.userForm.get("fonction"));
    
    if(!this.modeUpdate){
       this.userService.save(this.userForm.value).subscribe(
      response => {
        this.toastr.success('', "User saved", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
        this.router.navigate(['admin/users/list'])
      },
      error => {
        console.log("error ",error);
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server Error"});
        
      }
    )
    }else{
      this.userService.update(this.id,this.userForm.value).subscribe(
        response => {
          this.toastr.success('', "User updated", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.router.navigate(['admin/users/list'])
        },
        error => {
          console.log("error ",error);
          this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: "Server Error"});
          
        }
      )
    }
   

    

  }

}
