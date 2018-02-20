import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SlideableDirectiveDirective} from "../slideable-directive.directive";

@Component({
  selector: 'app-slider-component',
  templateUrl: './slider-component.component.html',
  styleUrls: ['./slider-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponentComponent implements OnInit {

  private _sliders: SlideableDirectiveDirective[];
  public get sliders  ():SlideableDirectiveDirective[]{
    return this._sliders;
  }
  public set sliders(value:SlideableDirectiveDirective[]){
    this._sliders = value;
    for(const u of this._sliders)
    console.log("update --->", u._el.nativeElement.innerText);
    this.ref.detectChanges();
  }

  constructor(private ref:  ChangeDetectorRef ) {
  }

  ngOnInit() {
    this._sliders = [];
  }

}
