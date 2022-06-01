import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/modules/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  constructor( private fb:FormBuilder, private authservice:AuthService ,
     private userAutService:UserAuthService , private router:Router, private toastr: ToastrService) {

   }

  ngOnInit(): void {
    if(this.userAutService.isLoggedIn()){
      console.log("isloggedIn ",this.userAutService.isLoggedIn());
      this.router.navigate(['admin']);
    }
    this.iniForm();
  }

  iniForm(){
    this.formGroup= this.fb.group({
      username : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
    })
  }

  user:User={
    username :"",
    password :""
  };

  loginProcess(){
     this.user.username = this.formGroup.value.username;
     this.user.password = this.formGroup.value.password;
    if(this.formGroup.valid){
        this.authservice.login(this.user).subscribe(
          response=>{
            const user =JSON.parse(response.userjsonstring);
            this.toastr.success('',`Welcom "` + user.prenom + `"`,{
              timeOut:2000,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass:'toast-top-right'
            });
            console.log("response ====>",response);
            this.userAutService.setToken(response.access_token);
  
 
           // console.log("user json",user);
            this.userAutService.setRoles(user.authorities[0].authority);
  
       
            this.router.navigate(['admin']);
            //const role = response.user.role[0];
           // alert(success)
          },
          error=>{
            console.log("error====>",error)
            //alert(error)
            this.toastr.error('',"the data is incorrect",{
              timeOut:2000,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass:'toast-top-right',
        
            });
          }
        )
    }
    else{
      alert('Please fill in all fields')
    }
  

  }

}
