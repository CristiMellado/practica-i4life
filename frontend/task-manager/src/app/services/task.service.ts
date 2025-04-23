import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
  //aqui añado las variables create y update para acceder a ellas
  createdAt : string;
  updatedAt: string;
  department?: string, //añado el nuevo campo de mi capa modelo
  status?: 'Todo' | 'In Progress' | 'Completed'; //añado el campo status para saber en cual se encuentra
  userId?: {
    _id: string;
    username: string;
  };

  //campo fecha
  dueDate?: Date;
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

  // Refactorizo para agregar el departamento  y el status y la fecha y poner el DAte
  addTask(title: string, department: string, status: string = 'Todo', dueDate:Date|null): Observable<Task> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Task>(this.apiUrl, { title, department,status, dueDate},{headers}); 
  }
    // Refactorizo para agregar el departamento  y el status y la fecha y poner el DAte
  addTaskAdmin(title: string, department: string, status: string = 'Todo', dueDate:Date|null, username: string): Observable<Task> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      return this.http.post<Task>(this.apiUrl, { title, department,status, dueDate, username},{headers}); 
  }
  toggleTask(id: string): Observable<Task> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`); //lo añadi
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}/status`, {headers});
  }
  deleteTask(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`); //lo añadi
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, {headers});
  }

  //metodo para actualizar el estado de una tarea
  updateTaskStatus(id: string, status: 'Todo'  | 'Completed'): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}/status`, { status });
  }
}

