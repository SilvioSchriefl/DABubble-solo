import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AvatarComponent } from './avatar/avatar.component';
import { HomeComponent } from './home/home.component';
import { RouteGuardService } from './route-guard.service';

const routes: Routes = [
  {path: '', component: StartScreenComponent, children: [
    {path: 'sign_in', component: SignInComponent},
    {path: 'sign_up', component: SignUpComponent},
    {path: 'avatar', component: AvatarComponent},
  ]},
  {path: 'home', component: HomeComponent, canActivate: [RouteGuardService],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
