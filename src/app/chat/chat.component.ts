import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChannelService } from '../Services/channel.service';
import { PopupService } from '../Services/popup.service';
import { log } from 'console';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass'
})
export class ChatComponent implements AfterViewInit {

  @ViewChild('channel_members') elementRef!: ElementRef;
  observer!: IntersectionObserver;

  constructor(
    public channel: ChannelService,
    public popup: PopupService,
  ) { }


  openChannelMembers() {
    this.popup.open_channel_members = true
    this.popup.open_popup = true    
  }


  ngAfterViewInit(): void {
    if(this.elementRef) {
       this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const boundingClientRect = entry.boundingClientRect;
          this.popup.position_top = Math.floor(boundingClientRect.top) + 85
          this.popup.position_right = Math.floor(boundingClientRect.right) - 1000
        });
      }, { threshold: 0 }); 
      this.observer.observe(this.elementRef.nativeElement);
    }
  }


  ngOnDestroy() {
    this.observer.disconnect();
  }
}
