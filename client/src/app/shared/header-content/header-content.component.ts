import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  time: Date;

  constructor() {
    this.getCurrentDate();
  }

  ngOnInit(): void {
   
  }

  getCurrentDate() {
    setInterval(() => {
      this.time = new Date(); 

    }, 1000);
  }
}
