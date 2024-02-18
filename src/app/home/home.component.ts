import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../Services/authentication-service.service';
import { ChannelService } from '../Services/channel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {


  open_workspace: boolean = true

  constructor(
    public auth: AuthenticationServiceService,
    public channel: ChannelService,
  ) { }


  async ngOnInit() {
    await this.auth.getAllUsers()
    await this.channel.getChannels()
    this.loadStandardChannel()
  }


  toggleWorkspace() {
    this.open_workspace = !this.open_workspace
  }


  loadStandardChannel() {
    let channel = this.channel.all_channels.find((channel: { id: number; }) => channel.id === 4);
    if (channel) this.channel.current_channel = channel;
    else console.log('Channel not found');
  }

}
