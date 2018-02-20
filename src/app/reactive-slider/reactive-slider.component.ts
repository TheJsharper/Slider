import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ReactiveSliderDirective} from "./reactive-slider.directive";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-reactive-slider',
  templateUrl: './reactive-slider.component.html',
  styleUrls: ['./reactive-slider.component.css']
})
export class ReactiveSliderComponent implements OnInit {

  private _sliders: BehaviorSubject<ReactiveSliderDirective[]>;

  public get sliders(): BehaviorSubject<ReactiveSliderDirective[]> {
    return this._sliders;
  }

  public set sliders(value: BehaviorSubject<ReactiveSliderDirective[]>) {
    this._sliders = value;
  }

  constructor() {
    this.sliders = new BehaviorSubject<ReactiveSliderDirective[]>([]);
  }

  ngOnInit() {
  }

}
