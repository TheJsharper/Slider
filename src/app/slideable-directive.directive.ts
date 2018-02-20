import {
  ChangeDetectorRef, Component,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Injectable,
  Renderer2
} from '@angular/core';
import {SliderComponentComponent} from "./slider-component/slider-component.component";

@Component({
  selector: 'appSlideableDirective',
  template: '<ng-content></ng-content>'
})
export class SlideableDirectiveDirective {

  constructor(private _renderer: Renderer2, public  _el: ElementRef, private sliderComponent: SliderComponentComponent, private ref: ChangeDetectorRef) {
    this.sliderComponent.sliders.push(this);
  }

  dragged;


  @HostListener('dragstart', ['$event'])
  dragStart(event: DragEvent) {
    this.dragged = event.target;

    const transfer: { index: number, content: string } = {
      index: this.sliderComponent.sliders.findIndex((val: SlideableDirectiveDirective) => val._el.nativeElement.innerText == this._el.nativeElement.innerText),
      content: this._el.nativeElement.innerText
    }
    event.dataTransfer.setData('Text', JSON.stringify(transfer));
    console.log("---> start", transfer, event.dataTransfer.getData("Text"));

  }

  @HostListener('dragend', ['$event'])
  dragEnd(event: DragEvent) {
    this.dragged = event.target;
    console.log("---> End", event);
    console.log(" END Dropping...", event.dataTransfer.getData("Text"))

  }

  @HostListener('dragover', ['$event'])
  dragOver($event: DragEvent) {
    this.dragged = event.target;
    console.log("---> Over", $event);
    this._renderer.addClass(this._el.nativeElement, "over");
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event'])
  dragEnter($event: DragEvent) {
    this.dragged = event.target;
    console.log("---> ENTER", $event);
  }

  @HostListener('dragleave', ['$event'])
  dragLeave($event: DragEvent) {
    this.dragged = event.target;
    console.log("---> leave", $event);
  }

  @HostListener('drop', ['$event'])
  dragDrop($event: DragEvent) {
    this.dragged = event.target;
    const data: { index: number, content: string } = JSON.parse($event.dataTransfer.getData('Text'));
    console.log("Dropping...", $event.dataTransfer.getData('Text'))
    const currentIndex: number = this.sliderComponent.sliders.findIndex((val: SlideableDirectiveDirective) => val._el.nativeElement.innerText == this._el.nativeElement.innerText);
    console.log("CUrrrrRR", data, currentIndex)
    // if (currentIndex > data.index) {
    //let currentText: string = this.sliderComponent.sliders[currentIndex]._el.nativeElement.innerText;
    //this.sliderComponent.sliders[data.index]._el.nativeElement.innerText = this._el.nativeElement.innerText;
    //this._el.nativeElement.innerText = this.sliderComponent.sliders[data.index]._el.nativeElement.innerText;

    let removed = this.sliderComponent.sliders.splice(currentIndex, this.sliderComponent.sliders.length);
    for (const rm of removed) {
      console.log("rmv-->", rm._el.nativeElement.innerText)
    }

    for (const rm of this.sliderComponent.sliders) {
      console.log("slider-->", rm._el.nativeElement.innerText)
    }

    removed.unshift(removed.pop());
    for (const rm of removed) {
      console.log("rmv unsift-->", rm._el.nativeElement.innerText)
    }
    console.log("---> lenght", this.sliderComponent.sliders.length);
    this.sliderComponent.sliders = [...this.sliderComponent.sliders.concat(removed)];
    this.ref.detectChanges();
    console.log("---> lenght", this.sliderComponent.sliders.length);

    for (const rm of this.sliderComponent.sliders) {
      console.log(" final slider-->", rm._el.nativeElement.innerText)
    }
  }

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

}


@Injectable()
export class DragService {
  private zone: string;

  startDrag(zone: string) {
    this.zone = zone;
  }

  accepts(zone: string): boolean {
    return zone == this.zone;
  }
}
