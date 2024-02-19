import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChannelService } from '../Services/channel.service';
import { PopupService } from '../Services/popup.service';
import { log } from 'console';
import { ChatService } from '../Services/chat.service';
import { AuthenticationServiceService } from '../Services/authentication-service.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass'
})
export class ChatComponent  {

 message: string = ''


  constructor(
    public channel: ChannelService,
    public popup: PopupService,
    public chat: ChatService,
    public auth: AuthenticationServiceService,
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


 async sendMessage() {
    let body = {
      message: this.message,
      chat_id: this.channel.current_channel['chat'].id
    }
    console.log(body)
    await this.chat.saveMessage(body)
  }


  showUserDetails(user: User) {
    this.popup.open_user_details = true
    this.popup.open_popup = true
    this.popup.detail_user = user
  }
}
