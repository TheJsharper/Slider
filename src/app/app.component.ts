import {AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'app';
  list: number[];
  reactiveList:Observable<number[]>;

  constructor(private ref: ChangeDetectorRef) {
    this.reactiveList = new Observable([1, 4, 7, 8, 20]);
  }

  ngOnInit(): void {
    this.reactiveList = new BehaviorSubject([1, 4, 7, 8, 20]).asObservable();
    this.list = [1, 4, 7, 8, 20];
    this.ref.detectChanges();
  }

  ngAfterContentChecked(): void {
    console.log("checked --->", this.list);
    this.reactiveList.subscribe((value:number[])=>{

      console.log(" reactive checked --->", value);
    });
  }

}
