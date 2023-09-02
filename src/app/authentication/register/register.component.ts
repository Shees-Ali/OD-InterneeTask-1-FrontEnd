import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base/base';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BasePage {
  @Output('login') login: EventEmitter<any> = new EventEmitter<any>();
  registerForm: FormGroup;
  constructor(injector: Injector) {
    super(injector);

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const res = await this.network.register(this.registerForm.value);
      console.log(res);
      // localStorage.setItem('token', res.token);
      this.utility.presentSuccessAlert('Successly Registered In', false);
      this.switchToLogin();
    }
  }

  // Method to switch to the login page
  switchToLogin() {
    this.login.emit();
  }
}
