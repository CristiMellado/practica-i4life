import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false,
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  selectedDepartment: string = ''; // Para almacenar el departamento seleccionado
  departments: string[] = ['Datos & IOT', 'Desarrollo Fullstack', 'Marketing', 'Diseño Web']; // Opciones de departamentos
  username: string = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService) {}
  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.loadTasks();
  }
  loadTasks() { //agregue aquí mi método para recibir todas las tareas
    this.taskService.getAllTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  addTask() {
    if (this.newTaskTitle.trim() === '' || this.selectedDepartment.trim() === '') return;
    
    this.taskService.addTask(this.newTaskTitle, this.selectedDepartment).subscribe({
      next: serverResponse=> {
        this.tasks.push(serverResponse);
        this.newTaskTitle = '';
        this.selectedDepartment = '';
      },
      error: serverError=> {
        console.error(serverError)
      }
    });
  }
  toggleTask(task: Task) {
    this.taskService.toggleTask(task._id!).subscribe((updatedTask) => {
      task.completed = updatedTask.completed;
    });
  }
  deleteTask(task: Task) {
    console.log('Tarea que se quiere eliminar:', task);
    this.taskService.deleteTask(task._id!).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t._id !== task._id);
    });
  }
  
  logout() {
    this.authService.logout();
  }

  onStatusChange(task: Task, checked: boolean) {
    // Decide el nuevo status en función de si está marcado o no
    const newStatus: 'Todo' | 'Completed' = checked ? 'Completed' : 'Todo';
  
    // Llama al servicio para actualizar el status en el backend
    this.taskService
      .updateTaskStatus(task._id!, newStatus)
      .subscribe(updatedTask => {
        // Refresca el task local con el status devuelto
        task.status = updatedTask.status;
      }, err => console.error(err));
  }
  
}


