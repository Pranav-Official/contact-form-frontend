import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
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
  deleteContact(id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.baseUrl + '/' + id, { headers: headers });
  }
  updateContact(
    id: string,
    name: string,
    email: string,
    phone: string,
    message: string
  ): Observable<any> {
    const body = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.baseUrl + '/' + id, body, { headers: headers });
  }
}
