import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
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
