import { SYSTEM_CONTENT } from 'src/content.const';
import { generateMenu, ILink } from './menu-config';
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

  href: string = "/";
  isAuth: boolean = false;

  userLink: ILink;
  SYSTEM_CONTENT = SYSTEM_CONTENT;

  constructor(private router: Router, public authService: AuthenticationService) {
    this.href = this.router.url;

    this.authService.user.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.userLink = {
          link: '/profile',
          title: user.username
        };
        this.isAuth = true;
      } else {
        this.menuItems = generateMenu();
        this.isAuth = false;
        this.userLink = null;
        
      }
    })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
  }
}
