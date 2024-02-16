import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  open_popup: boolean = false;
  open_user_details: boolean = false;
  edit_name = false
  edit_email = false
  edit_avatar = false
  feedback_text = ''
  response_success: boolean = false
  response_error: boolean = false
  open_create_channel: boolean = false
  open_account_menu: boolean = false
  open_channel_members: boolean = false
  position_right: number = 0
  position_top: number = 0

  constructor() { }

  closePopup() {
    this.open_popup = false
    this.edit_name = false
    this.edit_email = false
    this.edit_avatar = false
    this.open_user_details = false
    this.open_create_channel = false
    this.open_account_menu = false
  }

}
