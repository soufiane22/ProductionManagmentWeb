import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
 user_conected
 fonction
 role
  sidenav
  menuItems =["home", "presence","groupe"]
  constructor(private observer:BreakpointObserver ,
              public router:Router , 
              private userAutService:UserAuthService,
              public authService : AuthService) {

   }


  ngOnInit(): void {
    this.user_conected = this.userAutService.getUserName();
    this.fonction = this.userAutService.getFunction();
    this.role = this.userAutService.getRoles();
    console.log("role ",this.role);
    
    this.openNav();
    
  }

  public isLoggeIn(){
     this.userAutService.isLoggedIn();
  }

  public logout(){
    this.userAutService.clear();
    this.router.navigate(["/login"]);
  }

   openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
  }

   closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }



  





}
