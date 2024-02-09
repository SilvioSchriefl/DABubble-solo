import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service.service';
import { RouteGuardService } from './route-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'DABubble-solo';

  constructor(
    public auth: AuthenticationServiceService,
    public guard: RouteGuardService
  ) { }


  async ngOnInit() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token')) {
        this.guard.authenticated = true;
        this.auth.token = localStorage.getItem('token')!
        await this.auth.getUser()
      }
    }  
  }
}
