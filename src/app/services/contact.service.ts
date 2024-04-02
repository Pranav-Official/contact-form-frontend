import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  baseUrl = 'http://localhost:4000/api/contact';

  constructor(private http: HttpClient) {}

  submitContact(
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
    return this.http.post(this.baseUrl, body, { headers: headers });
  }
}
