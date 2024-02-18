import { Component } from '@angular/core';
import { PopupService } from '../../Services/popup.service';
import { ChannelService } from '../../Services/channel.service';

@Component({
  selector: 'app-edit-channel-popup',
  templateUrl: './edit-channel-popup.component.html',
  styleUrl: './edit-channel-popup.component.sass'
})
export class EditChannelPopupComponent {


  constructor(
    public popup: PopupService,
    public channel: ChannelService,
  ) { }


  closeEditChannel() {
    this.popup.open_overlay = false
    this.popup.open_edit_channel = false
  }

}
