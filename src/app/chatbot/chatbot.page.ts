import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})
export class ChatbotPage {
  messages: { text: string; type: string }[] = [
    {
      text: 'Hello Testing Converstaion UI',
      type: 'bot',
    },
    {
      text: 'Hello Testing Converstaion UI',
      type: 'user',
    },
    {
      text: 'Hello Testing Converstaion UI',
      type: 'bot',
    },
    {
      text: 'Hello Testing Converstaion UI',
      type: 'user',
    },
    {
      text: 'Hello Testing Converstaion UI',
      type: 'bot',
    },
    {
      text: 'Hello Testing Converstaion UI',
      type: 'user',
    },
    {
      text: 'Hello Testing Converstaion UI',
      type: 'bot',
    },
    {
      text: 'Hello Testing Converstaion UI',
      type: 'user',
    },
  ];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, type: 'user' });
      // Here, you can add logic to handle bot responses.
      // For simplicity, let's just echo the user's message as a bot response.
      this.messages.push({ text: this.newMessage + 'hahahahah', type: 'bot' });
      this.newMessage = '';
    }
  }
}
