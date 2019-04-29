import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'awsnodeAngular';
  isConnected = true;
  // status = 'ONLINE';

  constructor( private updates: SwUpdate, private connectionService: ConnectionService) {
    updates.available.subscribe( event => {
      console.log('update app Logic -->' + (new Date()).toString());
      updates.activateUpdate().then(() => document.location.reload());
    });

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      // if (this.isConnected) {
      //   this.status = "ONLINE";
      // }
      // else {
      //   this.status = "OFFLINE";
      // }
    });
  }
}
