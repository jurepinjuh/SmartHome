import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private notifyPath = environment.notifyUrl;

  newRecordInserted=new EventEmitter<String>();
  constructor() { }
  private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(this.notifyPath)
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
