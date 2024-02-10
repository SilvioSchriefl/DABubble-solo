import { Component } from '@angular/core';
import { PopupService } from '../popup.service';
import { AuthenticationServiceService } from '../authentication-service.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.sass'
})
export class UserDetailComponent  {

  edit_user = false
  name: string = ''
  email: string = ''

  constructor(
    private popup: PopupService,
    public auth: AuthenticationServiceService
  ) {  }


  closeUserDetails(){
    this.popup.open_user_details = false
  }


  toggleEditUser(){
    this.edit_user = !this.edit_user
  }


  async saveUser(){
    console.log(this.name, this.email);
    
    let body = {
      name: this.name,
      email: this.email,
    }
    await this.auth.updateUser(body)
  }
  
}
