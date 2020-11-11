import { Component, OnInit } from '@angular/core';
import { SmartHomeData } from '../Models/SmartHomeData';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataReady;
  public  temps;
  public hums;
  public hours=[];
  private date=new Date();
  public homeData:SmartHomeData;
  public dataToday:SmartHomeData[];
  constructor(private dataService:DataService) { 
    this.date.setDate(this.date.getDate());
    this.dataService.getCurrentData().subscribe(data=>{
      this.homeData=data;
    })
    this.dataService.getDataByDate(this.date.toUTCString()).subscribe(data=>{
      this.dataToday=data;
      this.drawChart();
      console.log(this.temps);
    })
  }

  ngOnInit(): void {
  
  
  }

  drawChart():void{
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
