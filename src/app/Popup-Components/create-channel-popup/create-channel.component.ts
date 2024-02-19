import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../../Services/authentication-service.service';
import { PopupService } from '../../Services/popup.service';
import { ChannelService } from '../../Services/channel.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.sass'
})
export class CreateChannelComponent implements OnInit {


  channel_name: string = '';
  channel_description: string = '';
  add_users: boolean = false;
  all_users: boolean = false
  search_name: string = '';
  error: boolean = false
  search_results: User[] = []
  selected_users: User[] = []
  all_members: User[] = []


  constructor(
    public auth: AuthenticationServiceService,
    public popup: PopupService,
    public channel: ChannelService,
  ) { }


  ngOnInit() {
    this.all_members = this.auth.all_users.filter((user) => user.id != this.auth.user.id)
  }


  closeAddChannel() {
    this.popup.closePopup()
    this.error = false
    this.add_users = false
  }


  async createChannel() {
    this.auth.loading = true
    let body = {
      name: this.channel_name,
      description: this.channel_description,
      members: this.getUserIds(),
      creator: this.auth.user.id
    }
    if (await this.channel.createChannel(body)) {
      this.popup.response_success = true
      setTimeout(() => this.popup.response_success = false, 2800)
      this.closeAddChannel()
      this.channel.setAuthorizatedChannels()
    }
    else {
      this.popup.response_error = true
      setTimeout(() => this.popup.response_error = false, 2800)
    }
    this.auth.loading = false
  }


  openAddUserMenu() {
    if (this.channel_name.length < 1) {
      this.error = true
      return
    }
    this.add_users = true
  }


  closeAddUsersMenu() {
    this.add_users = false
    this.closeSearchResults()
    this.selected_users = []
  }


  getUserIds() {
    if (this.all_users) return this.auth.all_users.map(user => user.id);
     else {
      let userIds = this.selected_users.map(user => user.id);
      userIds.push(this.auth.user.id);
      return userIds;
    }
  }


  handleFocus() {
    this.error = false
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


  closeSearchResults() {
    this.search_name = ''
    this.search_results = []
  }
}
