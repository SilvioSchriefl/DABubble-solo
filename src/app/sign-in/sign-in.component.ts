import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router } from '@angular/router';
import { RouteGuardService } from '../route-guard.service';
import { log } from 'console';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.sass'
})
export class SignInComponent {

  regexEmail = new RegExp('^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$');
  email: string = ''
  emailFocus: boolean = false
  email_valid: boolean = true
  password: string = ''
  form_valid: boolean = false
  signIn_successful = false;

  constructor(
    public auth: AuthenticationServiceService,
    public router: Router,
    public guard: RouteGuardService
  ) { }


  /**
   * logs the user in with email and password and redirct to the main component.
   */
  async signInWithPassword() {
    this.auth.loading = true
    let body = {
      email: this.email,
      password: this.password
    }
    if (this.password.length > 0 && this.email_valid && !this.auth.signIn_error) {
      if (await this.auth.Login(body)) this.handleLogIn()
      else this.auth.signIn_error = true
      setTimeout(() => this.auth.signIn_error = false, 3000);
    }
    this.auth.loading = false
    setTimeout(() => this.signIn_successful = false, 1900);
  }


  /**
   * logs the user as a guest in
   */
  guestLogin() {
    this.auth.guestSignIn()
    setTimeout(() => this.router.navigateByUrl('home'), 1900);
  }


  /**
   * checks whether it is a valid email
   * 
   * @param value text from inputfield
   */
  dataChanged(value: string) {
    this.email_valid = this.regexEmail.test(value)
  }


  handleLogIn() {
   
    
    this.guard.authenticated = true;
    this.signIn_successful = true
    this.auth.setLocalStorageAndToken()
    console.log(this.auth.user);
    if (!this.auth.user.avatar) {
      setTimeout(() => this.router.navigateByUrl('avatar'), 1900);
    } 
    else setTimeout(() => this.router.navigateByUrl('home'), 1900);
    setTimeout(() => this.signIn_successful = false, 1900);
  }
}

