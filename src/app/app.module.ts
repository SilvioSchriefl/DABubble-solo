import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AvatarComponent } from './avatar/avatar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { InterceptorService } from './Services/interceptor.service';
import { AuthenticationServiceService } from './Services/authentication-service.service';
import { HeaderComponent } from './header/header.component';
import { PopupComponent } from './Popup-Components/popup/popup.component';
import { UserDetailComponent } from './Popup-Components/user-detail-popup/user-detail.component';
import { ChannelMenuComponent } from './channel-menu/channel-menu.component';
import { ChatComponent } from './chat/chat.component';
import { ThreadComponent } from './thread/thread.component';
import { CreateChannelComponent } from './Popup-Components/create-channel-popup/create-channel.component';
import { ChannelMembersPopupComponent } from './Popup-Components/channel-members-popup/channel-members-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    SignInComponent,
    SignUpComponent,
    AvatarComponent,
    HomeComponent,
    HeaderComponent,
    PopupComponent,
    UserDetailComponent,
    ChannelMenuComponent,
    ChatComponent,
    ThreadComponent,
    CreateChannelComponent,
    ChannelMembersPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthenticationServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
