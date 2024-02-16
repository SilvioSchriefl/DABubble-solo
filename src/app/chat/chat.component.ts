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

  open_channel_members: boolean = false

  constructor(
    public channel: ChannelService,
    public popup: PopupService,
  ) { }


  openChannelMembers() {
    this.open_channel_members = true
  
  }


  closeViewChannelMembers() {
    this.open_channel_members = false
  }
}
