import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';
import {ReactiveSliderComponent} from "./reactive-slider.component";

@Directive({
  selector: '[appReactiveSliderDirective]'
})
export class ReactiveSliderDirective {
  private static indexCounter = 0;

  private index: number;

  constructor(private reactiveSliderComponent: ReactiveSliderComponent, private _el: ElementRef, private _renderer: Renderer2) {
    const currentValue: ReactiveSliderDirective[] = this.reactiveSliderComponent.sliders.value;
    this.index = ReactiveSliderDirective.indexCounter;
    ReactiveSliderDirective.indexCounter++;
    currentValue.push(this);
    console.log("construct --->", currentValue);
    this.reactiveSliderComponent.sliders.next(currentValue);

  }
  dragged;
  @HostListener('dragstart', ['$event'])
  dragStart(event: DragEvent) {
    console.log("Started");
    const transfer: { index: number, content: string } = {
      index: this.reactiveSliderComponent.sliders.value.findIndex((val: ReactiveSliderDirective) => val._el.nativeElement.innerText == this._el.nativeElement.innerText),
      content: this._el.nativeElement.innerText
    };
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
    console.log("---> leave", $event);
  }

  @HostListener('drop', ['$event'])
  dragDrop($event: DragEvent) {
    this.dragged = event.target;
    console.log("Dropping...", $event.dataTransfer.getData('Text'));
    const data: { index: number, content: string } = JSON.parse($event.dataTransfer.getData('Text'));
    const currentIndex: number = this.reactiveSliderComponent.sliders.value.findIndex((val: ReactiveSliderDirective) => val._el.nativeElement.innerText == this._el.nativeElement.innerText);
    console.log("CUrrrrRR", data, currentIndex);
    const currentValue:ReactiveSliderDirective[] = this.reactiveSliderComponent.sliders.value;
    let removed = currentValue.splice(currentIndex, currentValue.length);
    for (const rm of removed) {
      console.log("rmv-->", rm._el.nativeElement.innerText)
    }

    for (const rm of currentValue) {
      console.log("slider-->", rm._el.nativeElement.innerText)
    }

    removed.unshift(removed.pop());
    for (const rm of removed) {
      console.log("rmv unsift-->", rm._el.nativeElement.innerText)
    }
    console.log("---> lenght", currentValue.length, currentValue.concat(removed));
    this.reactiveSliderComponent.sliders.next(  currentValue.concat(removed));
   // this.ref.detectChanges();
    console.log("---> lenght", currentValue.length);

    for (const rm of currentValue) {
      console.log(" final slider-->", rm._el.nativeElement.innerText)
    }
  }

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

}
