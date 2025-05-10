import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

//Mi servicio de Treas
export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
  createdAt : string;
  updatedAt: string;
  department?: string, //añado el nuevo campo de mi capa modelo
  status?: 'Todo' | 'In Progress' | 'Completed'; //añado el campo status para saber en cual se encuentra
  userId?: {
    _id: string;
    username: string; //este es lo que saco del nombre
  };
  description:string;  
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

  // método añadir tarea que utilizo en tasks.page.ts (user)
  addTask(title: string, 
         department: string, 
         status: string = 'Todo', 
         dueDate:Date|null, 
         description:string): Observable<Task> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Task>(this.apiUrl, { title, department,status, dueDate,description},{headers}); 
  }
  
  // método añadir tarea que utilizo en home.page.ts (admin)
  addTaskAdmin(title: string, 
              department: string, 
              status: string = 'Todo', 
              dueDate:Date|null, 
              username: string, 
              description:string): Observable<Task> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      return this.http.post<Task>(this.apiUrl, { title, department,status, dueDate, userId:username, description},{headers}); //aqui paso del userId el username
  }

  //metodo actualizar tarea
  toggleTask(id: string): Observable<Task> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`); //lo añadi
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}/status`, {headers});
  }

  //método eliminar tarea
  deleteTask(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`); //lo añadi
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, {headers});
  }

  //metodo para actualizar el estado de una tarea
  updateTaskStatus(id: string, status: 'Todo'  | 'Completed'): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}/status`, { status });
  }


}

