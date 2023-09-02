import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotPage } from './chatbot.page';
import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChatbotPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatbotRoutingModule,
    ComponentsModule
  ]
})
export class ChatbotModule { }
