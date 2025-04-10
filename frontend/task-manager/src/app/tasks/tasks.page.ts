import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone:false
})
export class TasksPage implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';
  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.loadTasks();
  }
  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  addTask() {
    if (this.newTaskTitle.trim() === '') return;
    
    this.taskService.addTask(this.newTaskTitle).subscribe({
      next: serverResponse=> {
        this.tasks.push(serverResponse);
      this.newTaskTitle = '';
      },
      error: serverError=> {
        console.error(serverError)
      }
    });
  }
  toggleTask(task: any) {
    this.taskService.toggleTask(task._id).subscribe();
  }
  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t._id !== id);
    });
  }
}
