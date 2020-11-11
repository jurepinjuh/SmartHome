import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() data:any[]=[];
  @Input() hours:any[]=[];
  @Input() name:string;
  @Input() color:string;
  canvas: any;
  ctx: any;
 
  constructor() {
    
  
   }
   ngAfterViewInit():void{
this.canvas = document.getElementById(this.name);
  console.log(this.canvas);
  this.ctx = this.canvas.getContext('2d');
    const myChart =
     new Chart(this.ctx,
       {type: 'line',
       data:
        {labels: this.hours,
        datasets: [{
    label: this.name,
    data: this.data,
    borderColor:this.color,
    borderWidth: 3,
    fill:false
    }]
    },
    
    options: {
    legend: {
    display: true
    },
    responsive: true,
    display: true,
    }
    });
   }

  ngOnInit(): void {
    
  
  }
  
}
