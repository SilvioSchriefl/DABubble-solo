import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../Services/authentication-service.service';
import { PopupService } from '../Services/popup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  constructor(
    public auth: AuthenticationServiceService,
    public popup: PopupService,
  ) { }


  openAccountMenu() {
    this.popup.open_popup = true
    this.popup.open_account_menu = true
  }

}
