import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base/base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BasePage implements OnInit {
  @Output('register') register: EventEmitter<any> = new EventEmitter<any>();
  loginForm: FormGroup;
  constructor(injector: Injector) {
    super(injector);
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const res = await this.network.login(this.loginForm.value);
      console.log(res);
      localStorage.setItem('token', res.token);
      this.utility.presentSuccessAlert('Successly Logged In', false);
      this.router.navigate(['main']);
    }
  }

  // Method to switch to the regsiter page
  switchToRegistration() {
    this.register.emit();
  }
}
