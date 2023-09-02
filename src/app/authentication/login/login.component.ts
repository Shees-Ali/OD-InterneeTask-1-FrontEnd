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
    if (!this.loginForm.valid) {
      return this.utility.presentFailureAlert('Please fill all the required details');
    }

    await this.userService.login(this.loginForm.value);
    this.utility.presentSuccessAlert('Successly Logged In', false);
    this.router.navigate(['main']);
  }

  // Method to switch to the regsiter page
  switchToRegistration() {
    this.register.emit();
  }
}
