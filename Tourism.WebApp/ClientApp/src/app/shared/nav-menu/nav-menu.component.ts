import { generateMenu, generateMenuRegister, ILink } from './menu-config';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  menuItems: ILink[] = generateMenu();

  public href: string = "/";

  constructor(private router: Router, private authService: AuthenticationService) {
    this.href = this.router.url;

    this.authService.user.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.menuItems = generateMenuRegister(this.authService.userValue.username);
      } else {
        this.menuItems = generateMenu();
      }
    })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
