import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationPage } from './authentication.page';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    AuthenticationPage,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    ComponentsModule
  ]
})
export class AuthenticationModule { }
