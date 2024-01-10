import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() labels: string[] = [];
  @Input() rates: number[] = [];
  public chart: any;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.labels,
        datasets: [
          {
            label: "Historical Rates Chart",
            data: this.rates,
            backgroundColor: 'blue',
            borderColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("NgOnChanges Called! IN CHART");
    console.log(changes, this.chart)
    if (this.chart && (changes['labels'] || changes['rates'])) {
      console.log(this.chart)
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.rates;
      this.chart.update();
    }
  }
}
