import { Component } from '@angular/core';
import { PopupService } from '../popup.service';
import { AuthenticationServiceService } from '../authentication-service.service';
import { RouteGuardService } from '../route-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.sass'
})
export class PopupComponent {



  constructor(
    public popup: PopupService,
    public auth: AuthenticationServiceService,
    private guard: RouteGuardService,
    private router: Router
  ) { }


  closePopup() {
    this.popup.open_popup = false
  }


  async logOut() {
    let body = {
      email: this.auth.user.email,
    }
    if (await this.auth.logOut(body)) {
      this.closePopup()
      this.guard.authenticated = false;
      this.router.navigateByUrl('sign_in');
      this.auth.token = null!
      localStorage.clear()
    }
  }


  openUserDetails() {
    this.popup.open_user_details = true

  }


  stopPropagation(event: Event) {
    event.stopPropagation();
  };
}
