import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactFormComponent } from '../contact-form/contact-form.component';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}
@Component({
  selector: 'app-message-list',
  standalone: true,
  providers: [MessageService],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
  imports: [CommonModule, HttpClientModule, ContactFormComponent],
})
export class MessageListComponent implements OnInit {
  messageArray: Message[] = [];
  id: string = '';
  showAlert: boolean = false;
  showSuccessModal: boolean = false;
  showFailureModal: boolean = false;
  editMessage: Message | null = null;
  edit = false;
  editSuccess: boolean = false;
  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.messageService.getMessages().subscribe((data) => {
      this.messageArray = data;
    });
  }

  onEdit(message: Message) {
    this.editMessage = message;
    this.edit = true;
  }
  onEditClose(message: null | Message) {
    if (message) {
      let index = this.messageArray.findIndex(
        (item) => item._id === message._id
      );
      if (index !== -1) {
        this.messageArray[index] = message;
      }
    }
    this.edit = false;
  }

  deleteMessage(id: string) {
    this.id = id;
    this.showAlert = true;
  }
  cancelDelete() {
    this.id = '';
    this.showAlert = false;
  }

  confirmDelete() {
    if (this.id) {
      this.messageService.deleteContact(this.id).subscribe(
        (data) => {
          this.messageArray = this.messageArray.filter((obj) => {
            return obj._id !== this.id;
          });
          this.id = '';
          this.showAlert = false;
          this.showSuccessModal = true;
          setTimeout(() => {
            this.showSuccessModal = false;
          }, 3000);
        },
        (error) => {
          console.log(error);
          this.showFailureModal = true;
          setTimeout(() => {
            this.showFailureModal = false;
          }, 3000);
        }
      );
    }
  }
}
