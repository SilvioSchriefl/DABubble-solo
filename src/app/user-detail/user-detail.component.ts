import { Component } from '@angular/core';
import { PopupService } from '../popup.service';
import { AuthenticationServiceService } from '../authentication-service.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.sass'
})
export class UserDetailComponent {

  edit_user = false

  constructor(
    private popup: PopupService,
    public auth: AuthenticationServiceService
  ) {  }


  closeUserDetails(){
    this.popup.open_user_details = false
  }


  editUser(){
    this.edit_user = true
  }
  
}
