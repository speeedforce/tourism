import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authorize.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.logout();
  }

}
