import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  newRecordInserted=new EventEmitter<String>();
  constructor() { }
  private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44386/notify')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public insertNotifListener() {
    this.hubConnection.on('notif', (data) => {
      this.newRecordInserted.emit(data);
    });
  }
}
