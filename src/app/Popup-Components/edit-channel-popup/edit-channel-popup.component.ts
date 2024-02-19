import { Component } from '@angular/core';
import { PopupService } from '../../Services/popup.service';
import { ChannelService } from '../../Services/channel.service';
import { AuthenticationServiceService } from '../../Services/authentication-service.service';

@Component({
  selector: 'app-edit-channel-popup',
  templateUrl: './edit-channel-popup.component.html',
  styleUrl: './edit-channel-popup.component.sass'
})
export class EditChannelPopupComponent {


  edit_channel_name: boolean = false
  edit_channel_description: boolean = false
  edit_description: boolean = false
  channel_name: string = this.channel.current_channel.name
  channel_description: string = this.channel.current_channel.description

  constructor(
    public popup: PopupService,
    public channel: ChannelService,
    public auth: AuthenticationServiceService,
  ) { }


  closeEditChannel() {
    this.popup.open_overlay = false
    this.popup.open_edit_channel = false
  }


  openEditChannelName() {
    this.edit_channel_name = true
  }


  openEditChannelDescription() {
    this.edit_channel_description = true
  }


  async saveChannelName() {
    let body = {
      name: this.channel_name,
      id: this.channel.current_channel.id
    }
    if (await this.channel.updateChannel(body)) {
      this.popup.feedback_text = 'Channel-Name erfolgreich geändert'
      this.popup.response_success = true
      setTimeout(() => this.popup.response_success = false, 2800)
      this.channel.current_channel.name = this.channel_name
      this.closeEditChannel()
    }
    else {
      this.popup.response_error = true
      setTimeout(() => this.popup.response_error = false, 2800)
    }

  }


  async saveChannelDescription() {
    let body = {
      description: this.channel_description,
      id: this.channel.current_channel.id
    }
    console.log(body, 'tzest')
    if (await this.channel.updateChannel(body)) {
      this.popup.feedback_text = 'Beschreibung erfolgreich geändert'
      this.popup.response_success = true
      setTimeout(() => this.popup.response_success = false, 2800)
      this.channel.current_channel.description = this.channel_description
      this.closeEditChannel()
    }
    else {
      this.popup.response_error = true
      setTimeout(() => this.popup.response_error = false, 2800)
    }
  }


  closeEditFunction() {
    this.edit_channel_name = false
    this.edit_channel_description = false
  }


 async leaveChannel() {
    let body = {
      members:  this.getMemberIds(),
      id: this.channel.current_channel.id
    }
    console.log(body)
    if(await this.channel.updateChannel(body)) {
      this.popup.feedback_text = 'Channel erfolgreich verlassen'
      this.popup.response_success = true
      setTimeout(() => this.popup.response_success = false, 2800)
      this.closeEditChannel()
      this.updateChannelMembers()
    }
    else {
      this.popup.response_error = true
      setTimeout(() => this.popup.response_error = false, 2800)
    }
  }


  getMemberIds() {
    let channel_membersIds = this.channel.current_channel.members.map((user) => user.id) 
    channel_membersIds = channel_membersIds.filter((id) => id !== this.auth.user.id)
    return channel_membersIds
  }


  updateChannelMembers() {
     let index =   this.channel.current_channel.members.findIndex((user) => user.id === this.auth.user.id)
    this.channel.current_channel.members.splice(index, 1)
    this.channel.setAuthorizatedChannels()
  }


 async deleteChannel() {
    let body = {
      id: this.channel.current_channel.id
    }
    if( await this.channel.updateChannel(body)) {     
      this.popup.feedback_text = 'Channel erfolgreich gelöscht'
      this.popup.response_success = true
      setTimeout(() => this.popup.response_success = false, 2800)
      this.closeEditChannel()
      this.updateChannels()
    }
    else {
      this.popup.response_error = true
      setTimeout(() => this.popup.response_error = false, 2800)
    }
  }


  updateChannels() {
   let index = this.channel.all_channels.findIndex((channel) => channel === this.channel.current_channel)
   this.channel.all_channels.splice(index, 1)
   this.channel.setAuthorizatedChannels()
  }
}


