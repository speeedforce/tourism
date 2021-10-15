import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  time: Date;
  @Input() title: string;
  @Input() info: string;
  @Input() image: string;
  @Input() timeOn: boolean;

  constructor() {
   
  }

  ngOnInit(): void {
   
    if (this.timeOn) {
      this.getCurrentDate();
    }
  }

  getCurrentDate() {
    setInterval(() => {
      this.time = new Date(); 

    }, 1000);
  }
}
