import { MessageService } from './../../services/message.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  OnChanges,
  EventEmitter,
  SimpleChanges,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { HttpClientModule } from '@angular/common/http';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [ContactService, MessageService],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnChanges {
  @Input() message: Message | null = null;
  @Input() edit: boolean = true;
  @Output() onEditClose = new EventEmitter<Message | null>();

  contactForm!: FormGroup;
  submitSuccess: boolean = false;
  submitFail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private messageService: MessageService
  ) {
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      message: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      const { name, email, phone, message } = this.contactForm.value;
      if (this.message) {
        this.messageService
          .updateContact(this.message._id, name, email, phone, message)
          .subscribe(
            (response) => {
              this.onEditClose.emit(response);
              this.contactForm.reset(); // Reset form
            },
            (error) => {
              console.error('Error updating contact:', error);
            }
          );
      } else {
        this.contactService
          .submitContact(name, email, phone, message)
          .subscribe(
            (response) => {
              console.log('Contact submitted successfully:', response);
              this.contactForm.reset();
              this.submitSuccess = true;
              setTimeout(() => {
                this.submitSuccess = false;
              }, 2000);
            },
            (error) => {
              console.error('Error submitting contact:', error);
              this.submitFail = true;
              setTimeout(() => {
                this.submitFail = false;
              }, 2000);
            }
          );
      }
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      if (this.message) {
        this.contactForm.patchValue({
          name: this.message.name,
          email: this.message.email,
          phone: this.message.phone,
          message: this.message.message,
        });
      }
    }
  }
}
