import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { HttpClientModule } from '@angular/common/http';

interface Message {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
}
@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [MessageService],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit {
  messageArray: Message[] = [];
  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.messageService.getMessages().subscribe((data) => {
      this.messageArray = data;
    });
  }
}
