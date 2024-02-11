import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.sass'
})
export class CreateChannelComponent {


  channel_name: string = '';
  channel_description: string = '';
  add_users: boolean = false;
  all_users: boolean = false
  search_name: string = '';


  constructor(
    public auth: AuthenticationServiceService
  ) {
    
  }


  closeAddChannel() {
    
  }


  createChannel() {
    
  }


  addUser() {
    this.add_users = true
  }

}
