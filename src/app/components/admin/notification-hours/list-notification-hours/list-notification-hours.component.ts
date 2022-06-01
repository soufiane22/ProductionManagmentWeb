import { Component, OnInit } from '@angular/core';
import { NotificationHoursService } from 'src/app/shared/services/notification-hours.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-list-notification-hours',
  templateUrl: './list-notification-hours.component.html',
  styleUrls: ['./list-notification-hours.component.css']
})
export class ListNotificationHoursComponent implements OnInit {

  constructor(private notificationHoursService:NotificationHoursService, private userAuthService:UserAuthService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.notificationHoursService.getAllnotofications().subscribe(
      response=>{
         console.log("response ",response);
         
      },
      error =>{
        console.log("error ====>",error);
      }
    )
  }

  

}
