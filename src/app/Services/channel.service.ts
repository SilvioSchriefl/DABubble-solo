import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environments';
import { lastValueFrom } from 'rxjs';
import { Channel } from '../interfaces/channel.interface';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService implements OnInit {

  current_channel!:Channel 
  all_channels:Channel[] = [] 

  constructor(
    private http: HttpClient,
    private popup: PopupService,
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


  async addUserToChannel( body: { members: number[] }) {
    let url = environment.baseUrl + 'channel/'
    try {
       await lastValueFrom(this.http.patch(url, body))
       this.popup.feedback_text = 'Benutzer erfolgreich hinzugefügt'
      return true
    }
    catch (error) {
      console.error
      this.popup.feedback_text = 'Ein Fehler ist aufgetreten'
      return false
    }
   

  }
}
