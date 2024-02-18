import { Component } from '@angular/core';
import { ChannelService } from '../../Services/channel.service';
import { User } from '../../interfaces/user.interface';
import { PopupService } from '../../Services/popup.service';

@Component({
  selector: 'app-channel-members-popup',
  templateUrl: './channel-members-popup.component.html',
  styleUrl: './channel-members-popup.component.sass'
})
export class ChannelMembersPopupComponent {

  constructor(
    public channel: ChannelService,
    public popup: PopupService,	
  ) { }



  showUserDetails(user: User) {
    this.popup.open_user_details = true
    this.popup.open_popup = true
    this.popup.detail_user = user
  }
}
