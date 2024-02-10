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

  constructor() { }

  closePopup() {
    this.open_popup = false
    this.edit_name = false
    this.edit_email = false
    this.edit_avatar = false
    this.open_user_details = false
  }

}
