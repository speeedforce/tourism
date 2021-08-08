import { generateMenu, ILink } from './menu-config';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  menuItems: ILink[] = generateMenu();

  public href: string = "/";

  constructor(private router: Router) {
    this.href = this.router.url;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
