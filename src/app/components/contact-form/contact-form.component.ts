import { ContactService } from './../../services/contact.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [ContactService],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  ngOnInit(): void {
    console.log('Contact Form');
  }

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      const { name, email, phone, message } = this.contactForm.value;
      this.contactService
        .submitContact(name, email, phone, message)
        .subscribe((response) => {
          console.log(' contact submitted successfully', response);
          this.contactForm.reset();
        });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
