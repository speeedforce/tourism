
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: 'page-styles'
  }
})
export class HomeComponent {

  time: Date;



  constructor() {
    this.getCurrentDate();
  }



  getCurrentDate() {
    setInterval(() => {
      this.time = new Date(); 

    }, 1000);
  }
}
