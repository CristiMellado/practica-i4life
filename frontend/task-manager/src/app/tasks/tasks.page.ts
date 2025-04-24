import { Component, OnInit } from '@angular/core';
import { TaskService,Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone:false
})

//refactorizo para que se muestre el departamento 
//Son las variables que utilizo para recuperar los datos en mi front
export class TasksPage implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';
  selectedDepartment: string = ''; // Para almacenar el departamento seleccionado
  departments: string[] = ['Datos & IOT', 'Desarrollo Fullstack', 'Marketing', 'Diseño Web']; // Opciones de departamentos
  username: string = ''; 
  status: string = 'Todo';
  selectedDueDate:string = ''; //almacenar fecha de vencimiento
  newTaskDescription: string = ''; //Variable para la descripción

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

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
    if (this.newTaskTitle.trim() === '' || this.selectedDepartment.trim() === '') {
        this.presentAlert('Por favor, rellena todos los campos');
      return;
    }

    //IMPORANTE ESPECIFICAR EL UNDEFIND Y EL NULL 
    const dueDate: Date | null = this.selectedDueDate ? new Date(this.selectedDueDate) : null;

    this.taskService.addTask(this.newTaskTitle, this.selectedDepartment, this.status, dueDate as Date | null, this.newTaskDescription).subscribe({
      next: serverResponse=> {
        this.tasks.push(serverResponse);
        this.newTaskTitle = '';
        this.selectedDepartment = '';
        this.status = 'Todo'; //aqui añadimos tambien el status
        this.selectedDueDate = '';
        this.newTaskDescription='';
        //añado la alerta que me va a mostrar el éxito
        this.presentAlert('La tarea se ha registrado con éxito');
      },
      error: serverError=> {
        console.error(serverError)
      }
    });
  }

  //metodo para mostrar la alerta 
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: message.includes('éxito') ? 'Tarea registrada' : 'Error',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
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

  //metodo tareas pendientes
  get todoTasks() {
    return this.tasks.filter((task)=>task.status === 'Todo')
  }

  //metodo tareas completadas
  get completedTasks() {
    return this.tasks.filter((task)=>task.status === 'Completed')
  }

}
