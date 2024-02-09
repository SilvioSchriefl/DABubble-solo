import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationServiceService } from './authentication-service.service';
import { InterceptorService } from './interceptor.service';



@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],

  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthenticationServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
     }
  ],
})


export class AppServerModule {}
