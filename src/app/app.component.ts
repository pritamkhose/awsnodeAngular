import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConnectionService } from 'ng-connection-service';

import { Observable, fromEvent, merge, of} from 'rxjs';
import { map, mapTo } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'awsnodeAngular';
  isConnected = true;
  // status = 'ONLINE';
  online: any;

  constructor( private updates: SwUpdate, private connectionService: ConnectionService) {
    updates.available.subscribe( event => {
      console.log('update app Logic -->' + (new Date()).toString());
      updates.activateUpdate().then(() => document.location.reload());
    });

    // this.connectionService.monitor().subscribe(isConnected => {
    //   this.isConnected = isConnected;
    //   // if (this.isConnected) {
    //   //   this.status = "ONLINE";
    //   // }
    //   // else {
    //   //   this.status = "OFFLINE";
    //   // }
    // });

    this.online = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
   );

    this.online.subscribe((isOnline) => {
    if (isOnline) {
      this.isConnected = true;
      } else {
        console.log('you are offline');
        this.isConnected = false;
      }
    // console.log(isOnline);
    });
  }
}
