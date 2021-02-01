import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SmartHomeData } from '../Models/SmartHomeData';
import { catchError, map } from 'rxjs/operators';
import { SmartHomeSettings } from '../Models/SmartHomeSettings';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpService: HttpClient) {
  }
  
  private uriPath = environment.apiEndpoint;

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
  public getDataByPeriod(from,to): Observable<SmartHomeData[]> {
    return this.httpService.get<SmartHomeData[]>(this.uriPath+`/getAllbyPeriod/${from}/${to}`).pipe(
      map(data => data.map(data=>new SmartHomeData().deserialize(data)))
    );
  }

  public getCurrentData(): Observable<SmartHomeData> {
    return this.httpService.get<SmartHomeData>(this.uriPath+'/getcurrentdata').pipe(
      map(data => new SmartHomeData().deserialize(data))   
    );
  }

  public getSettings(): Observable<SmartHomeSettings> {
    return this.httpService.get<SmartHomeSettings>(this.uriPath+'/getSettings').pipe(
      map(data => new SmartHomeSettings().deserialize(data))   
    );
  }
  public editSettings(formData:SmartHomeSettings):any{
    return this.httpService.put<any>(this.uriPath + `/updateSettings`, formData
    ).pipe(
      catchError((err) => throwError(err))
    );
  }

}
