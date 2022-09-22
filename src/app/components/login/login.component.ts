import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/modules/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { ToastrService } from 'ngx-toastr';
export let userConnected: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  show = false
  constructor(private fb: FormBuilder, private authservice: AuthService,
    private userAutService: UserAuthService, private router: Router, private toastr: ToastrService) {

  }



  ngOnInit(): void {
    if (this.userAutService.isLoggedIn()) {
      console.log("isloggedIn ", this.userAutService.isLoggedIn());
      this.router.navigate(['admin']);
    }
    this.iniForm();

  }

  iniForm() {
    this.formGroup = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  user: User = {
    username: "",
    password: ""
  };

  loginProcess() {
    this.show = true
    this.user.username = this.formGroup.value.username;
    this.user.password = this.formGroup.value.password;
    if (this.formGroup.valid) {
      this.authservice.login(this.user).subscribe(
        response => {
          userConnected = JSON.parse(response.userjsonstring);
          this.show = false
          this.toastr.success('', `Welcom "` + userConnected.prenom + `"`, {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          console.log("response ====>", response);
          this.userAutService.setToken(response.access_token);


          // console.log("user json",user);
          this.userAutService.setRoles(userConnected.authorities[0].authority);

          this.userAutService.setUserName(userConnected.prenom + " " + userConnected.nom)
          this.userAutService.setFunction(userConnected.fonction)
          this.router.navigate(['admin/home']);
          //const role = response.user.role[0];
          // alert(success)
        },
        error => {
          this.show = false
          console.log("error====>", error)
          if (error.status == 403) {
            this.toastr.error('', "the data is incorrect", {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
          } else {
            this.toastr.error('', "Server error", {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
          }
        }
      );
    }

    else {
      this.show = false
      alert('Please fill in all fields')
    }


  }

}
