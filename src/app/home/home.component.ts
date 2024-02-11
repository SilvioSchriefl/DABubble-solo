import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {


  open_workspace: boolean = true

  constructor(
    public auth: AuthenticationServiceService
  ) { }


  async ngOnInit() {
    await this.auth.getAllUsers()
  }


  toggleWorkspace() {
    this.open_workspace = !this.open_workspace
  }

}
