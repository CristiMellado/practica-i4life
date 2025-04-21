import { Component, OnInit } from '@angular/core';
import { TaskService,Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone:false
})

//refactorizo para que se muestre el departamento 
export class TasksPage implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';
  selectedDepartment: string = ''; // Para almacenar el departamento seleccionado
  departments: string[] = ['Datos & IOT', 'Desarrollo Fullstack', 'Marketing', 'Diseño Web']; // Opciones de departamentos
  username: string = ''; 
  //status: string = 'Todo';

  constructor(
    private taskService: TaskService,
    private authService: AuthService) {}
  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.loadTasks();
  }
  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  addTask() {
    if (this.newTaskTitle.trim() === '' || this.selectedDepartment.trim() === '') return;
    
    this.taskService.addTask(this.newTaskTitle, this.selectedDepartment).subscribe({
      next: serverResponse=> {
        this.tasks.push(serverResponse);
        this.newTaskTitle = '';
        this.selectedDepartment = '';
        //this.status = 'Todo'; //aqui añadimos tambien el status
      },
      error: serverError=> {
        console.error(serverError)
      }
    });
  }
  toggleTask(task: any) {
    this.taskService.toggleTask(task._id).subscribe();
  }
  deleteTask(task: Task) { //paso la ruta correcta antes recibia el id, ahora tengo que pasarle el objeto
    this.taskService.deleteTask(task._id!).subscribe(() => {  //accedo en mi objeto a su atributo id
      this.tasks = this.tasks.filter((t) => t._id !== task._id);
    });
  }

  logout() {
    this.authService.logout();
  }
}
