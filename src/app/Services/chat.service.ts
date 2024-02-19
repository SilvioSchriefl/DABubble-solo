import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  current_chat!: any

  constructor(
    private http: HttpClient
  ) { }


  async saveMessage(body: { message: string; chat_id: any; }) {

    let url = environment.baseUrl + 'message/'
    try {
      let response = await lastValueFrom(this.http.post(url, body))
      this.current_chat.push(response)
    }
    catch (error) {
      console.error
      console.log(error)
    }
  }


  formatDate(dateString: string) {
    let date = new Date(dateString);
    let daysOfWeek = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let dayOfWeek = daysOfWeek[date.getDay()];
    let dayOfMonth = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
  }
}
