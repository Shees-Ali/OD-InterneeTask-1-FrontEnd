import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss']
})
export class AuthenticationPage {
  showLogin: boolean = true; 
  showRegister: boolean = false;

  switchToLogin() {
    this.showLogin = true;
    this.showRegister = false;
  }

  switchToRegister() {
    this.showLogin = false;
    this.showRegister = true;
  }
}
