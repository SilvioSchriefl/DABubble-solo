import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environments';
import { lastValueFrom } from 'rxjs';
import { Channel } from '../interfaces/channel.interface';
import { PopupService } from './popup.service';
import { AuthenticationServiceService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService implements OnInit {

  current_channel!:Channel 
  all_channels:Channel[] = [] 
  authorized_channels:Channel[] = []

  constructor(
    private http: HttpClient,
    private popup: PopupService,
    private auth: AuthenticationServiceService
  ) { }


  async ngOnInit() {
    await this.getChannels()
  }

  async createChannel(body: { name: string; description: string; members: number[]; creator: number }) {
    let url = environment.baseUrl + 'channel/'
    try {
      await lastValueFrom(this.http.post(url, body))
      this.popup.feedback_text = 'Channel erfolgreich erstellt'
      await this.getChannels()
      return true
    }
    catch (error: any) {
      if(error.error.error == 'Channel name already exists') this.popup.feedback_text = 'Channel-Name bereits vergeben'
      else this.popup.feedback_text = 'Ein Fehler ist aufgetreten'
      return false
    }
  }


  async getChannels() {
    let url = environment.baseUrl + 'channel/'
    try {
      this.all_channels = await lastValueFrom(this.http.get<Channel[]>(url))
    }
    catch (error) {
      console.error
    }
  }


  async updateChannel( body: { members?: number[], id: number }) {
    let url = environment.baseUrl + 'channel/'
    try {
      let response = await lastValueFrom(this.http.patch(url, body))
      console.log(response)
      return true
    }
    catch (error) {
      console.error
      this.popup.feedback_text = 'Ein Fehler ist aufgetreten'
      return false
    }
  }


  setAuthorizatedChannels() {
    this.authorized_channels = []
    this.all_channels.forEach(channel => {
      let channel_membersIds = channel.members.map((user) => user.id)
      if (channel_membersIds.includes(this.auth.user.id)) this.authorized_channels.push(channel)
    })
  }
}
