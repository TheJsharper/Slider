import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider-priority',
  templateUrl: './slider-priority.component.html',
  styleUrls: ['./slider-priority.component.css']
})
export class SliderPriorityComponent implements OnInit {


  @Input() sliders: number[];

  constructor() {
  }

  ngOnInit() {
  }

}
