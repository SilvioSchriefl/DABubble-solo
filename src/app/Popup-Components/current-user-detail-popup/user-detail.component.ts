import { Component } from '@angular/core';
import { PopupService } from '../../Services/popup.service';
import { AuthenticationServiceService } from '../../Services/authentication-service.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.sass'
})
export class UserDetailComponent  {

  input_valid: boolean = true
  name: string = ''
  email: string = ''
  regexEmail = new RegExp('^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$');
  images = ['/assets/img/small_avatar/avatar (1).png', '/assets/img/small_avatar/avatar (2).png', '/assets/img/small_avatar/avatar (3).png', '/assets/img/small_avatar/avatar (4).png', '/assets/img/small_avatar/avatar (5).png', '/assets/img/small_avatar/avatar (6).png']
  avatar: string = ''
  

  constructor(
    public popup: PopupService,
    public auth: AuthenticationServiceService
  ) {  }


  closeUserDetails(){
    this.popup.open_user_details = false
    this.popup.edit_email = false
    this.popup.edit_name = false
    this.popup.edit_avatar = false
  }


  toggleEditUser(){
    this.popup.edit_name = !this.popup.edit_name
  }


  toggleEditEmail(){
    this.popup.edit_email = !this.popup.edit_email
  }


  toggleEditAvatar(){
    this.popup.edit_avatar = !this.popup.edit_avatar
    this.avatar = this.auth.user.avatar
  }


  async saveUser(){ 
    if (this.name.length < 3) {
      this.input_valid = false
      return
    }
    this.auth.loading = true
    let body = {
      name: this.name,
    }
    if (await this.auth.updateUser(body)) this.handleResponse('Name erfolgreich geändert!')
    this.auth.loading = false
  }


  async saveEmail(){
    if(!this.regexEmail.test(this.email)) {      
      this.input_valid = false
      return
    }
    this.auth.loading = true
    let body = {
      email: this.email,
    }
    if (await this.auth.updateUser(body)) this.handleResponse('Email erfolgreich geändert!')
    this.auth.loading = false
  }


  async saveAvatar(){
    this.auth.loading = true
    let body = {
      avatar: this.avatar
    }
    if (await this.auth.updateUser(body)) this.handleResponse('Avatar erfolgreich geändert!')
    this.auth.loading = false
  }


  handleResponse(text: string){
    this.popup.feedback_text = text
    this.popup.response_success = true  
    this.popup.closePopup()
    setTimeout(() => this.popup.response_success = false, 2800)
  }


  handleFocus() {
    this.input_valid = true
  }


  setAvatar(avatar: string){
    this.avatar = avatar
  }
}
