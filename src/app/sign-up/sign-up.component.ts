import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../Services/authentication-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.sass'
})
export class SignUpComponent {


  emailFocus: boolean = false
  name: string = ''
  password: string = ''
  email: string = ''
  emailError: boolean = false
  regexEmail = new RegExp('^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$');
  formValid: boolean = false
  nameFocus: boolean = false
  passwordFocus: boolean = false
  validPassword: boolean = false
  match: boolean = false
  matchPassword!: string
  passwordConfirmed: boolean = false
  error_message: string = ''
  signUp_successful: boolean = false


  constructor(
    public auth: AuthenticationServiceService,
    public router: Router
  ) { }


  /**
   * A function that handles data changes based on the input field.
   *
   * @param {any} value - the value being checked for validation
   * @param {string} inputfield - the input field being checked
   */
  dataChanged(value: any, inputfield: string) {
    if (inputfield == 'email') {
      this.emailError = this.regexEmail.test(value)
    }
    this.validateForm()
  }


  /**
  * Check if the password contains a number.
  *
  * @return {boolean} true if the password contains a number, false otherwise.
  */
  hasNumber(): boolean {
    return /[0-9]/.test(this.password);
  }


  /**
   * Checks if the password contains any special characters.
   *
   * @return {boolean} Returns true if the password contains special characters, false otherwise.
   */
  hasSpecialChr(): boolean {
    return /[*.!@$%^&(){}[\]:;<>,.?/~_+\-=|\\]/.test(this.password);
  }


  /**
   * Checks if the password has a valid length.
   *
   * @return {boolean} Returns true if the password has a valid length, otherwise false.
   */
  hasValidLength(): boolean {
    return /^.{8,32}$/.test(this.password);
  }


  /**
   * Checks if the password contains an uppercase letter.
   *
   * @return {boolean} True if the password contains an uppercase letter, false otherwise.
   */
  hasUppercase(): boolean {
    return /[A-Z]/.test(this.password);
  }


  /**
   * Checks whether the form has been completely filled out
   */
  validateForm() {
    if (this.password === this.matchPassword) this.passwordConfirmed = true
    else this.passwordConfirmed = false
    if (this.hasNumber() && this.hasSpecialChr() && this.hasValidLength() && this.hasUppercase() && this.name.length > 2 && this.emailError && this.passwordConfirmed) this.formValid = true
    else this.formValid = false
  }


  /**
   * creates a new user account and redirects to the avatar component
   */
  async signUp() {
    this.auth.loading = true
    let body = {
      email: this.email,
      password: this.password,
      name: this.name
    }
    if (this.formValid) 
     if(await this.auth.SignUp(body)) {
      setTimeout(() => this.router.navigateByUrl('sign_in'), 2800);
      this.signUp_successful = true
      setTimeout(() => this.signUp_successful = false, 2800);
     } 
     else {
      if(this.auth.email_error) this.error_message = 'E-Mail Adresse bereits vergeben'
      else this.error_message = 'Etwas ist schief gelaufen'
     }
    this.auth.loading = false
  }


}
