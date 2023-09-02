import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BasePage } from '../base/base';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})
export class ChatbotPage extends BasePage implements OnInit {
  messages: { role: string; message: string }[] = [];
  newMessage: string = '';
  gettingMessage: boolean = false;
  @ViewChild('messagesContainer') private chatContainer: ElementRef;

  constructor(injector: Injector) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    await this.initBot();
  }

  async initBot() {
    const string = localStorage.getItem('user_chat');
    if (string) {
      const _messages = JSON.parse(string);
      const user = await this.userService.getCurrentUser();
      if (_messages.user_id == user.id) {
        return (this.messages = _messages.chat);
      }
    }
    const res = await this.network.chat(this.messages);
    if (res?.status == 'Success') {
      this.messages = res.messages;
    }
  }

  async sendMessage() {
    this.gettingMessage = true;
    if (this.newMessage.trim() !== '') {
      this.messages.push({ message: this.newMessage, role: 'User' });
      const res = await this.network.chat(this.messages);
      if (res?.status == 'Success') {
        this.messages = res.messages;
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      }
      this.newMessage = '';
    }
    this.gettingMessage = false;
  }

  ngOnDestroy() {
    if (this.messages.length > 0) {
      console.log(this.userService.user);
      const obj = {
        user_id: this.userService.user.id,
        chat: this.messages,
      };
      const string = JSON.stringify(obj);
      localStorage.setItem('user_chat', string);
    }
  }
}
