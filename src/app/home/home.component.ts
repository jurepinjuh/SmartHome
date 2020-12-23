import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartHomeData } from '../Models/SmartHomeData';
import { DataService } from '../Services/data.service';
import {interval, Observable, Subject} from 'rxjs';
import { NotifyService } from '../Services/notify.service';
import { ChartComponent } from '../chart/chart.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild(ChartComponent,{static:false}) chart:ChartComponent;
  dataReady;
  public  temps;
  public hums;
  public hours=[];
  private date=new Date();
  public homeData:SmartHomeData;
  public dataToday:SmartHomeData[];
  constructor(private dataService:DataService,private notifyService:NotifyService) { 
    this.date.setDate(this.date.getDate());
    this.refreshData();
  }

  ngOnInit(): void {
    this.notifyService.startConnection();
    this.notifyService.insertNotifListener();
    this.notifyService.newRecordInserted.subscribe(data=>{
        this.refreshData();
    })
    
  }
  refreshData(){
   
    this.dataService.getCurrentData().subscribe(data=>{
      this.homeData=data;
    })
    
    this.dataService.getDataByDate(this.date.toUTCString()).subscribe(data=>{
      this.dataToday=data;  
    },
    (err=>{}),
    ()=>{
      this.dataReady=0;
      this.drawChart(); 
    }
    );
  }
  
  drawChart():void{
    this.temps=[];
    this.hums=[];
    this.hours=[];
    this.temps=this.dataToday.map(data=>data.temperature);
    let dates=this.dataToday.map(data=>data.dateTime);
    this.hums=this.dataToday.map(data=>data.humidity); 
    dates.forEach(element => {
      element=new Date(element);
      var localeSpecificTime = element.toLocaleTimeString();
      this.hours.push(localeSpecificTime.replace(/:\d+ /, ' '));
    });
    this.dataReady=1;
    
  }
}
