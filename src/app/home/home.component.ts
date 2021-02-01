import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartHomeData } from '../Models/SmartHomeData';
import { DataService } from '../Services/data.service';
import { interval, Observable, Subject } from 'rxjs';
import { NotifyService } from '../Services/notify.service';
import { ChartComponent } from '../chart/chart.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild(ChartComponent, { static: false }) chart: ChartComponent;
  dataReady=0;
  public temps;
  public hums;
  public period: number;
  public hours = [];
  private date = new Date();
  public homeData: SmartHomeData;
  public dataToday: SmartHomeData[];
  constructor(private dataService: DataService, private notifyService: NotifyService) {
    this.period = 0;
    this.date.setDate(this.date.getDate());
    this.refreshData();
  }

  ngOnInit(): void {
    this.notifyService.startConnection();
    this.notifyService.insertNotifListener();
    this.notifyService.newRecordInserted.subscribe(data => {
      if(this.period!=2){
        this.refreshData();
      }   
    })

  }
  refreshData() {
    this.dataService.getCurrentData().subscribe(data => {
      this.homeData = data;
    })
    if (this.period == 0) {
      this.dataService.getDataByDate(this.date.toUTCString()).subscribe(data => {
        this.dataToday = data;
      },
        (err => { }),
        () => {
          this.dataReady = 0;
          this.drawChart();
        }
      );
    }
    else {
      if (this.period == 1) {
        var now = new Date();
        var lastHour = new Date();
        lastHour.setHours(now.getHours() - 1);
        this.dataService.getDataByPeriod(lastHour.toUTCString(), now.toUTCString()).subscribe(data => {
          this.dataToday = data;
        }, (err => { }),
          () => {
            this.dataReady = 0;
            this.drawChart();
          });
      }
      if (this.period == 2) {
        var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
          , day = beforeOneWeek.getDay()
          , diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
          , lastMonday = new Date(beforeOneWeek.setDate(diffToMonday))
          , lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));

          this.dataService.getDataByPeriod(lastMonday.toUTCString(), lastSunday.toUTCString()).subscribe(data => {
            this.dataToday = data;
          }, (err => { }),
            () => {
              this.dataReady = 0;
              this.drawChart();
            });
      }
    }
  }


  periodChange() {
    this.refreshData();
  }

  drawChart(): void {
    this.temps = [];
    this.hums = [];
    this.hours = [];
    this.temps = this.dataToday.map(data => data.temperature);
    let dates = this.dataToday.map(data => data.dateTime);
    this.hums = this.dataToday.map(data => data.humidity);
    dates.forEach(element => {
      element = new Date(element);
      var localeSpecificTime = element.toLocaleTimeString() + "\n" + element.toLocaleDateString();
      this.hours.push(localeSpecificTime);
    });
    setTimeout(() => {
      this.dataReady = 1;
    }, 500);
    

  }
}
