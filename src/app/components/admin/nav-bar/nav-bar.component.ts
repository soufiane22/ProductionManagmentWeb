import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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
  @ViewChild(MatSidenav)
  sidenav! : MatSidenav
  menuItems =["home", "presence","groupe"]
  constructor(private observer:BreakpointObserver ,
              public router:Router , 
              private userAutService:UserAuthService,
              public authService : AuthService) {

   }


  ngOnInit(): void {
    
  }

  public isLoggeIn(){
     this.userAutService.isLoggedIn();
  }

  public logout(){
    this.userAutService.clear();
    this.router.navigate(["/login"]);
  }

  ngAfterViewInit(){

    this.observer.observe([]).subscribe(
      res=>{
        if(res.matches){
          this.sidenav.mode = 'side';
          this.sidenav.close();
        }else{
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      }
    );
  }

  close(){
    this.sidenav.close();
  }



}
