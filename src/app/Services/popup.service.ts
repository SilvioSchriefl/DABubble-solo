import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PopupService {


  open_edit_channel: boolean = false
  open_channel_members: boolean = false
  open_overlay: boolean = false
  open_popup: boolean = false;
  open_add_members: boolean = false
  open_current_user_details: boolean = false;
  open_user_details: boolean = false
  edit_name = false
  edit_email = false
  edit_avatar = false
  feedback_text = ''
  response_success: boolean = false
  response_error: boolean = false
  open_create_channel: boolean = false
  open_account_menu: boolean = false
  detail_user!: User 
    
  

  constructor() { }

  closePopup() {
    this.open_popup = false
    this.edit_name = false
    this.edit_email = false
    this.edit_avatar = false
    this.open_current_user_details = false
    this.open_user_details = false
    this.open_create_channel = false
    this.open_account_menu = false
  }


  openAddMembers() {
    this.open_add_members = true
    this.open_channel_members = false
    this.open_overlay = true
  }


  stopPropagation(event: Event) {
    event.stopPropagation();
  };

}
