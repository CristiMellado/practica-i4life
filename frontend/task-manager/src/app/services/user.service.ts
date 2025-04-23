import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<{ _id: string, username: string }[]> {
    return this.http.get<{ _id: string, username: string }[]>(`${this.apiUrl}/users`);  // Usamos apiUrl aquí
  }
}
