import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../Services/authentication-service.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.sass'
})
export class StartScreenComponent implements OnInit {


  animationStart: boolean = false
  animationLogo: boolean = false
  d_none: boolean = false
  active: boolean = false

  constructor(
   public router: Router,
   public auth: AuthenticationServiceService
  ) { }


   /**
   * set timeouts for animations and redirects to sign-in
   */
   ngOnInit(): void {
    setTimeout(() => this.animationStart = true, 1000);
    setTimeout(() => this.animationLogo = true, 2500);
    setTimeout(() => this.d_none = true, 3500);
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token')) {
        this.router.navigateByUrl('home')
      } 
      else  this.router.navigateByUrl('sign_in')
    }
  
  }


  goToSignUp() {   
    this.router.navigateByUrl('sign_up')
  }
}


