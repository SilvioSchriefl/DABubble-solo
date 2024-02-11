import { Component, Input, input } from '@angular/core';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-channel-menu',
  templateUrl: './channel-menu.component.html',
  styleUrl: './channel-menu.component.sass'
})
export class ChannelMenuComponent {

  rotate1: string = 'rotate(270deg)'
  rotate2: string = 'rotate(270deg)'
  open_channels: boolean = false;
  open_direct_chat: boolean = false;
  @Input() open_workspace: boolean = true


  constructor(
    public popup: PopupService
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
}
