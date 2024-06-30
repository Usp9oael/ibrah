import { Component } from '@angular/core';

interface Message {
  sender: string;
  preview: string;
  chats: Chat[];
}

interface Chat {
  sender: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages: Message[] = [
    {
      sender: 'Alice',
      preview: 'Hey, how are you?',
      chats: [
        { sender: 'Alice', message: 'Hey, how are you?', time: '10:00 AM' },
        { sender: 'You', message: 'I am good, thanks!', time: '10:02 AM' }
      ]
    },
    {
      sender: 'Ibrahim',
      preview: 'How can I start investing?',
      chats: [
        { sender: 'Ibrahim', message: 'How can I start investing?', time: '10:00 AM' },
        { sender: 'You', message: 'Follow the below procedure', time: '10:02 AM' }
      ]
    },
    {
      sender: 'Faraj',
      preview: 'What is smart invest?',
      chats: [
        { sender: 'Faraj', message: 'What is smart invest?', time: '10:00 AM' },
        { sender: 'You', message: 'I will take you through', time: '10:02 AM' }
      ]
    },
    {
      sender: 'Alice',
      preview: 'Hey, how are you?',
      chats: [
        { sender: 'Alice', message: 'Hey, how are you?', time: '10:00 AM' },
        { sender: 'You', message: 'I am good, thanks!', time: '10:02 AM' }
      ]
    },
    {
      sender: 'Bob',
      preview: 'Check out this link',
      chats: [
        { sender: 'Bob', message: 'Check out this link', time: '09:30 AM' },
        { sender: 'You', message: 'Interesting, thanks!', time: '09:35 AM' }
      ]
    }
    // Add more messages as needed
  ];

  selectedMessage: Message | null = null;
  newMessage: string = '';

  selectMessage(message: Message) {
    this.selectedMessage = message;
  }

  sendMessage() {
    if (this.selectedMessage && this.newMessage.trim()) {
      this.selectedMessage.chats.push({
        sender: 'You',
        message: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.newMessage = '';
    }
  }
}
