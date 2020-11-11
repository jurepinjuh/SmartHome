import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SmartHomeData } from '../Models/SmartHomeData';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpService: HttpClient) {
  }
  
  private uriPath="https://localhost:44386/smartHome"

  public getAll(): Observable<SmartHomeData[]> {
    return this.httpService.get<SmartHomeData[]>(this.uriPath+'/getAll').pipe(
      map(data => data.map(data=>new SmartHomeData().deserialize(data)))
    );
  }

  public getDataByDate(date): Observable<SmartHomeData[]> {
    return this.httpService.get<SmartHomeData[]>(this.uriPath+`/getAllbydate/${date}`).pipe(
      map(data => data.map(data=>new SmartHomeData().deserialize(data)))
    );
  }

  public getCurrentData(): Observable<SmartHomeData> {
    return this.httpService.get<SmartHomeData>(this.uriPath+'/getcurrentdata').pipe(
      map(data => new SmartHomeData().deserialize(data))   
    );
  }
}
