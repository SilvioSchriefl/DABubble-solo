import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../Services/authentication-service.service';
import { ChannelService } from '../Services/channel.service';
import { ChatService } from '../Services/chat.service';
import { User } from '../interfaces/user.interface';
import { PopupService } from '../Services/popup.service';

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
    private chat: ChatService,
    private popup: PopupService
  ) { }


  async ngOnInit() {
    await this.auth.getAllUsers()
    await this.channel.getChannels()
    this.channel.setAuthorizatedChannels()
    this.loadStandardChannel()
    console.log(this.channel.authorized_channels)
  }


  toggleWorkspace() {
    this.open_workspace = !this.open_workspace
  }


  loadStandardChannel() {
    let channel = this.channel.all_channels.find((channel: { id: number; }) => channel.id === 25);
    if (channel) {
      this.channel.current_channel = channel;
      this.chat.current_chat = channel['chat'].messages
    } 
    else console.log('Channel not found');
  }

}
