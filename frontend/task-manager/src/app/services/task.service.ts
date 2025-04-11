import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
  department?: string, //añado el nuevo campo de mi capa modelo
}
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  //método para obtener todas las tareas
  getAllTasks(): Observable <Task[]>{
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  //método para obtener las tareas del usuario
  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Task[]>(this.apiUrl, { headers });
    }

  // Refactorizo para agregar el departamento  
  addTask(title: string, department: string,): Observable<Task> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Task>(this.apiUrl, { title, department},{headers}); //agrege headers //Deparment
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
