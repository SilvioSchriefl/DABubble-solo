import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../Services/authentication-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.sass'
})
export class AvatarComponent {


  images = ['/assets/img/small_avatar/avatar (1).png', '/assets/img/small_avatar/avatar (2).png', '/assets/img/small_avatar/avatar (3).png', '/assets/img/small_avatar/avatar (4).png', '/assets/img/small_avatar/avatar (5).png', '/assets/img/small_avatar/avatar (6).png']
  imageUrl: string = '/assets/img/big_avatar/81. Profile.png'
  file_error = false
  avatar: string = '/assets/img/81. Profile.png'

  constructor(
    public auth: AuthenticationServiceService,
    private router: Router
  ) { }


 async  goToMain() {
    let body = {
      avatar: this.avatar
    }
    await this.auth.updateUser(body)
    this.auth.user.avatar = this.avatar
    this.router.navigateByUrl('home');
  }


  setAvatar(avatar: string) {
    this.avatar = avatar
  }


  onFileSelected(event: any) {
    
  }
}
