import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service'; //importamos el servicio de useService
import { AlertController } from '@ionic/angular'; //imporamos el component de ionic para mostrar las alertas

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
  status: string = 'Todo';
  selectedDueDate:string = '';
  selectedUser:string = '';
  users: { _id: string, username: string }[] = []; // Tipo correcto para los usuarios
  newTaskDescription: string = ''; //Variable para la descripción
  searchTerm: string = ''; //variable para encontrar el nombre del usuario
  filteredTodoTasks: Task[] = [];
  filteredCompletedTasks: Task[] = [];
  today: string = new Date().toISOString(); //guarda la fecha en formato string

  constructor(
    private taskService: TaskService,
    private userService: UserService, //crear el servicio para obtener el usuario
    private authService: AuthService,
    private alertController: AlertController //aquí inicializao mmi alerta
    ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';  //aquí me guarda el nombre del usuario
    console.log('Username cargado en HomePage:', this.username)
    this.loadTasks(); //cargo las tareas
    this.loadUsers(); //cargo los usuarios 
  }
  loadTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      // Cargamos todas las tareas
      this.filteredTodoTasks = this.todoTasks;
      this.filteredCompletedTasks = this.completedTasks;
    });
  }

//método añadir tarea
  addTask() {
    console.log("addTask");
    // Si alguno de los 2 campos está vacío, mostramos un alert
    if (this.newTaskTitle.trim() === '' || this.selectedDepartment.trim() === '') {
      this.presentAlert('Por favor, rellena todos los campos.');
      return;
    }

    //IMPORANTE ESPECIFICAR EL UNDEFIND Y EL NULL 
    const dueDate: Date | null = this.selectedDueDate ? new Date(this.selectedDueDate) : null;
    console.log('este es el usuario',this.selectedUser);
    
    this.taskService.addTaskAdmin(this.newTaskTitle, this.selectedDepartment, this.status, dueDate as Date | null, this.selectedUser, this.newTaskDescription).subscribe({
      next: serverResponse=> {
        this.tasks.push(serverResponse);
        this.newTaskTitle = '';
        this.selectedDepartment = '';
        this.status = 'Todo'; //aqui añadimos tambien el status
        this.selectedDueDate = '';
        this.selectedUser = '';
        this.newTaskDescription=''; //añado la descripcion
        this.presentAlert('La tarea se ha registrado con éxito'); //pongo la alerta
        this.filterTasks(); //aplicar el filtro necesario para que sea por nombre.
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

  /* Ahora no lo estoy utilizando
  toggleTask(task: Task) {
    this.taskService.toggleTask(task._id!).subscribe((updatedTask) => {
      task.completed = updatedTask.completed;
    });
  }*/

  //método eliminar tarea  
  deleteTask(task: Task) {
    console.log('Tarea que se quiere eliminar:', task);
    this.taskService.deleteTask(task._id!).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t._id !== task._id);
      this.filterTasks(); //aplica el filtro para actualizar la vista 
    });
  }
  
  logout() {
    this.authService.logout();
  }

  //método para cambiar el status
  onStatusChange(task: Task, checked: boolean) {
    // Decide el nuevo status en función de si está marcado o no
    const newStatus: 'Todo' | 'Completed' = checked ? 'Completed' : 'Todo';
  
    // Llama al servicio para actualizar el status en el backend
    this.taskService
      .updateTaskStatus(task._id!, newStatus)
      .subscribe(updatedTask => {
        // Refresca el task local con el status devuelto
        task.status = updatedTask.status;
        
        this.filterTasks(); //aplica el filtro para actualizar la vista 
      }, err => console.error(err));
  }

  get completedTasks() {
    return this.tasks.filter((task)=>task.status === 'Completed')
  }
  get todoTasks() {
    return this.tasks.filter((task)=>task.status === 'Todo')
  }

  //método para cargar los usuarios
  loadUsers() {
  this.userService.getAllUsers().subscribe(users => {
    console.log("Usuarios recibidos:", users); // 👈 Revisa esto en la consola del navegador
    this.users = users;
  }, error => {
    console.error("Error al cargar usuarios:", error);
  });
}

  //método para filtrar las tareas
  filterTasks() {
    if (!this.searchTerm) {
      // Si no escribo nada me va a mostrar todas las tareas
      this.filteredTodoTasks = this.todoTasks;
      this.filteredCompletedTasks = this.completedTasks;
      return;
    }
    
    const query = this.searchTerm.toLowerCase(); //me guarda el nombre que escribo en el buscador
    
    // Filtra las tareas pendientes por nombre de usuario
    this.filteredTodoTasks = this.todoTasks.filter(task => 
      task.userId?.username.toLowerCase().includes(query)
    );
    
    // Filtra las tareas completadas por nombre de usuario
    this.filteredCompletedTasks = this.completedTasks.filter(task => 
      task.userId?.username.toLowerCase().includes(query)
      );
    }
  
}


