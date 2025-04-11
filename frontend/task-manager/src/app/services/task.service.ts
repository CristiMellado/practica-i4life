import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Task[]>(this.apiUrl, { headers });
    }
  addTask(title: string): Observable<Task> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Task>(this.apiUrl, { title},{headers}); //agrege headers 
  }
  toggleTask(id: string): Observable<Task> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`); //lo añadi
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, {headers});
  }
  deleteTask(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`); //lo añadi
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, {headers});
  }
}

/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
}*/
