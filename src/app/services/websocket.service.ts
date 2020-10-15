import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestMessage } from 'src/app/models/index';

@Injectable()
export class WebsocketService implements OnDestroy {

  private socket;

  constructor(private readonly ngZone: NgZone) {

    this.ngZone.runOutsideAngular(() => {
      this.socket = io(environment.SOCKET_ENDPOINT, {
        reconnection: true,
        reconnectionDelay: 5000,
        reconnectionAttempts: 5
      });
    });

    this.on('connection').subscribe(console.log);
    this.on('error').subscribe(console.log);
    this.on('wsException').subscribe(console.log);
    this.on('connect_error').subscribe(console.log);
  }

  emit(eventName: string, eventValue: RequestMessage) {
    this.socket.emit(eventName, eventValue);
  }
  
  on(eventName: string) {
    return fromEvent(this.socket, eventName);
  }

  off(eventName: string) {
    this.socket.off(eventName);
  }

  ngOnDestroy() {
    this.socket.close();
  }
}
