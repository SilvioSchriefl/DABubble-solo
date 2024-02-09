import { Injectable } from '@angular/core';
import { environment } from './environments/environments';
import { User } from './interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AllUsers } from './interfaces/all_users.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  signIn_error = false;
  email_error = false;
  signUp_successful = false;
  all_users: AllUsers[] | undefined
  user: User = {
    name: '',
    email: '',
    password: '',
    avatar: '',
    token: '',
    id: 0,
    active: false
  };
  baseUrl = environment.baseUrl
  token!: string
  loading: boolean = false

  constructor(
    private http: HttpClient,
  ) { }

  async Login(body: { email: string, password: string }) {
    let url = this.baseUrl + 'sign_in/'
    try {
      this.user = await lastValueFrom(this.http.post<User>(url, body))
      return true
    }
    catch (error) {
      return false
    }
  }


  async SignUp(body: { email: string, password: string, name: string }) {
    let url = this.baseUrl + 'sign_up/'
    try {
      await lastValueFrom(this.http.post(url, body))
      return true
    }
    catch (error: any) {
      if (error.error.email) this.email_error = true
      else console.error
      return false
    }
  }

  guestSignIn() {
  }


  async setAvatar(body: { avatar: string; }) {
    let url = this.baseUrl + 'update_user/'
    try {
      await lastValueFrom(this.http.post(url, body))
    }
    catch {
      console.error
    }
  }


  setLocalStorageAndToken() {
    localStorage.setItem('token', this.user.token)
    this.token = this.user.token
  }


  async getUser() {
    let url = this.baseUrl + 'get_user/'
    try {
      this.user = await lastValueFrom(this.http.get<User>(url))
    }
    catch {
      console.error
    }
  }


  async logOut(body: { email: string }) {
    let url = this.baseUrl + 'log_out/'
    try {
      await lastValueFrom(this.http.post(url, body))
      return true
    }
    catch {
      console.error
      return false
    }
  }


  async getAllUsers() {
    let url = this.baseUrl + 'get_all_users/'
    try {
    this.all_users = await lastValueFrom(this.http.get<AllUsers[]>(url))
 
    }
    catch {
      console.error
    }
  }
}
