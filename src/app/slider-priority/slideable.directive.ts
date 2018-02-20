import {ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';
import {SliderPriorityComponent} from "./slider-priority.component";

@Directive({
  selector: '[appSlideable]'
})
export class SlideableDirective {

  constructor(private _renderer: Renderer2, public  _el: ElementRef, private sliderComponent: SliderPriorityComponent, private ref: ChangeDetectorRef) { }

  dragged;


  @HostListener ('dragstart', ['$event'])
  dragStart(event: DragEvent) {
    this.dragged = event.target;

    const transfer: { index: number, content: string } = {
      index: this.sliderComponent.sliders.findIndex((val: number) => val == parseInt(this._el.nativeElement.innerText)),
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
    const currentIndex: number = this.sliderComponent.sliders.findIndex((val: number) => val == parseInt(this._el.nativeElement.innerText));
    console.log("CUrrrrRR", data, currentIndex)
    // if (currentIndex > data.index) {

    let removed = this.sliderComponent.sliders.splice(currentIndex, this.sliderComponent.sliders.length);
    for (const rm of removed) {
      console.log("rmv-->", rm)
    }

    for (const rm of this.sliderComponent.sliders) {
      console.log("slider-->", rm)
    }

    removed.unshift(removed.pop());
    for (const rm of removed) {
      console.log("rmv unsift-->", rm)
    }
    console.log("---> lenght", this.sliderComponent.sliders.length);
    this.sliderComponent.sliders = [...this.sliderComponent.sliders.concat(removed)];
    this.ref.detectChanges();
    console.log("---> lenght", this.sliderComponent.sliders.length);

    for (const rm of this.sliderComponent.sliders) {
      console.log(" final slider-->", rm)
    }
  }

  @HostBinding('draggable')
  get draggable() {
    return true;
  }


}
