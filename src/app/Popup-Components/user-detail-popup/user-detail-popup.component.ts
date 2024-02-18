import { Component } from '@angular/core';
import { PopupService } from '../../Services/popup.service';

@Component({
  selector: 'app-user-detail-popup',
  templateUrl: './user-detail-popup.component.html',
  styleUrl: './user-detail-popup.component.sass'
})
export class UserDetailPopupComponent {

  constructor(
    public popup: PopupService
  ) { }



  closeUserDetails() {
    this.popup.closePopup()
  }

}
