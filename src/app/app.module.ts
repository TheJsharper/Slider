import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SliderComponentComponent } from './slider-component/slider-component.component';
import {DragService, SlideableDirectiveDirective} from './slideable-directive.directive';
import { ReactiveSliderComponent } from './reactive-slider/reactive-slider.component';
import { ReactiveSliderDirective } from './reactive-slider/reactive-slider.directive';
import { SliderPriorityComponent } from './slider-priority/slider-priority.component';
import { SlideableDirective } from './slider-priority/slideable.directive';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponentComponent,
    SlideableDirectiveDirective,
    ReactiveSliderComponent,
    ReactiveSliderDirective,
    SliderPriorityComponent,
    SlideableDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [DragService],
  bootstrap: [AppComponent]
})
export class AppModule { }
