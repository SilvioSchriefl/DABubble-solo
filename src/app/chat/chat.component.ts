import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChannelService } from '../Services/channel.service';
import { PopupService } from '../Services/popup.service';
import { log } from 'console';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass'
})
export class ChatComponent  {

 


  constructor(
    public channel: ChannelService,
    public popup: PopupService,
  ) { }


  openChannelMembers() {
    this.popup.open_channel_members = true
    this.popup.open_overlay = true
  
  }


  closeViewChannelMembers() {
    this.popup.open_channel_members = false 
    this.popup.open_overlay = false
    this.popup.open_add_members = false
    this.popup.open_edit_channel = false
  }


  openEditChannel() {
    this.popup.open_edit_channel = true
    this.popup.open_overlay = true
  }
}
