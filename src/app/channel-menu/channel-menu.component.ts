import { Component, Input, input } from '@angular/core';
import { PopupService } from '../Services/popup.service';
import { ChannelService } from '../Services/channel.service';
import { Channel } from '../interfaces/channel.interface';
import { ChatService } from '../Services/chat.service';

@Component({
  selector: 'app-channel-menu',
  templateUrl: './channel-menu.component.html',
  styleUrl: './channel-menu.component.sass'
})
export class ChannelMenuComponent {

  rotate1: string = 'rotate(0deg)'
  rotate2: string = 'rotate(0deg)'
  open_channels: boolean = true;
  open_direct_chat: boolean = true;
  @Input() open_workspace: boolean = true


  constructor(
    public popup: PopupService,
    public channel: ChannelService,
    private chat: ChatService,
  ) { }


  openChannelMenu() {
    this.open_channels = !this.open_channels
    if(this.open_channels) this.rotate1 = 'rotate(0deg)'
    else this.rotate1 = 'rotate(270deg)'
  }


  openDirectChat() {
    this.open_direct_chat = !this.open_direct_chat
    if(this.open_direct_chat) this.rotate2 = 'rotate(0deg)'
    else this.rotate2 = 'rotate(270deg)'
  }


  openAddChannel() {
    this.popup.open_popup = true
    this.popup.open_create_channel = true
  }


  selectChannel(channel: Channel) {
    this.channel.current_channel = channel
    this.chat.current_chat = channel['chat'].messages
  }
}
