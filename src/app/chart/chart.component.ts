import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() hours: any[] = [];
  @Input() name: string;
  @Input() color: string;
  @Input() resetForm: Subject<Boolean> = new Subject<Boolean>();
  canvas: any;
  ctx: any;
  myChart;
  constructor() {

  }
  drawChart() {
    this.canvas = document.getElementById(this.name);
    this.ctx = this.canvas.getContext('2d');
    this.myChart =
      new Chart(this.ctx,
        {
          type: 'line',
          data:
          {
            labels: this.hours,
            datasets: [{
              label: this.name,
              data: this.data,
              borderColor: this.color,
              borderWidth: 3,
              fill: false
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
  ngAfterViewInit(): void {
    this.drawChart();
  }

  destroyChart(){
    this.myChart.clear();
    var canvas = this.myChart.chart.canvas;
    console.log(canvas)
  
    // Reset canvas height/width attributes starts a fresh with the canvas context
    canvas.width = this.myChart.chart.width;
    canvas.height = this.myChart.chart.height;
  
    // < IE9 doesn't support removeProperty
    if (canvas.style.removeProperty) {
      canvas.style.removeProperty('width');
      canvas.style.removeProperty('height');
    } else {
      canvas.style.removeAttribute('width');
      canvas.style.removeAttribute('height');
    }
  
  }

  ngOnInit(): void {
    this.resetForm.subscribe(reset => {
      if (reset) {
        console.log(this.data);
        console.log(this.hours)
        this.destroyChart();
        setTimeout(() => {
          this.drawChart();
        }, 100); 
      }
    })

  }

}
