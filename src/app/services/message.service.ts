import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Message {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = 'http://localhost:4000/api/contacts';
  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl);
  }
}
