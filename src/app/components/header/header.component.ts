import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/base';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BasePage implements OnInit {
  user: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    const token = localStorage.getItem('token');
    if (token == null) {
      return;
    }
    this.user = await this.userService.getCurrentUser();
  }

  logout() {
    this.userService.logout();
  }
}
