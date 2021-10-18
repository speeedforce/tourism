import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  state: string;

  ngOnInit() {
    this.state = 'password';
    console.log('profile');
  }


  changeState(params: string) {
    this.state = params;
  }

}
