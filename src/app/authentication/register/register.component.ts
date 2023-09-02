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
      const res= await this.userService.register(this.registerForm.value);
      this.utility.presentSuccessAlert('Successly Registered In', false);
      this.switchToLogin();
    }
  }

  // Method to switch to the login page
  switchToLogin() {
    this.login.emit();
  }
}
