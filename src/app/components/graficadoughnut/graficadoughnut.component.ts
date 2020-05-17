import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'graficadoughnut',
  templateUrl: './graficadoughnut.component.html',
  styles: []
})
export class GraficadoughnutComponent implements OnInit {

 @Input('ChartLabels') ChartLabels: Label[] = [];
 @Input('ChartData')   ChartData: MultiDataSet = []
 @Input('ChartType')  ChartType: ChartType ;

  constructor() { }

  ngOnInit() {
  }

}
