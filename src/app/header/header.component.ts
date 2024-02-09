import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { PopupService } from '../popup.service';

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
  }

}
