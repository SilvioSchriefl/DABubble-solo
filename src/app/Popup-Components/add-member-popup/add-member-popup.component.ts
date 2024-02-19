import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../Services/popup.service';
import { ChannelService } from '../../Services/channel.service';
import { User } from '../../interfaces/user.interface';
import { AuthenticationServiceService } from '../../Services/authentication-service.service';

@Component({
  selector: 'app-add-member-popup',
  templateUrl: './add-member-popup.component.html',
  styleUrl: './add-member-popup.component.sass'
})
export class AddMemberPopupComponent implements OnInit {


  search_name: string = '';
  search_results: User[] = [];
  selected_users: User[] = []
  all_members: User[] = []

  constructor(
    public popup: PopupService,
    public channel: ChannelService,
    public auth: AuthenticationServiceService
  ) { }


  ngOnInit() {
    let all_channelIds = this.channel.current_channel.members.map((user) => user.id)
    this.auth.all_users.forEach((user) => {
      if(!all_channelIds.includes(user.id)) this.all_members.push(user)
    })
  }

  closeAddMember() {
    this.popup.open_add_members = false;
    this.popup.open_overlay = false;
  }


  searchUsers() {
    this.search_results = this.all_members.filter(user => user.name.toLowerCase().includes(this.search_name.toLowerCase()))
  }


  selectUser(user: User) {
    this.search_name = ''
    this.search_results = []
    this.selected_users.push(user)
    let index = this.all_members.findIndex((u) => u === user)
    this.all_members.splice(index, 1)
  }


  removeSelectedUser(user: User) {
    let index = this.selected_users.findIndex((u) => u === user)
    this.selected_users.splice(index, 1)
    this.all_members.push(user)
  }


  async addUsersToChannel() {
    this.channel.current_channel.members.push(...this.selected_users)
    let channel_userIds = this.channel.current_channel.members.map((user) => user.id)
    let body = {
      members: channel_userIds,
      id: this.channel.current_channel.id
    }
    if(await this.channel.updateChannel( body)) {
      this.popup.feedback_text = 'Benutzer erfolgreich hinzugefügt'
      this.popup.response_success = true
      setTimeout(() => this.popup.response_success = false, 2800)
    }
    else {
      this.popup.response_error = true
      setTimeout(() => this.popup.response_error = false, 2800)
    }
    this.closeAddMember()
  }
}
