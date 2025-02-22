import { Component, inject, signal } from '@angular/core';
import { AddTaskModalComponent } from '@components/add-task-modal/add-task-modal.component';
import { KanbanColumnComponent } from '@components/kanban-column/kanban-column.component';
import { Tasks } from '@interfaces/tasks.interface';
import { HotToastService } from '@ngxpert/hot-toast';
import { ModalService } from '@services/modal.service';
import { TaksService } from '@services/taks.service';
import { SkeletonComponent } from "../skeleton/skeleton.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [KanbanColumnComponent, AddTaskModalComponent, SkeletonComponent, CommonModule],
  templateUrl: './kanban-board.component.html',
})
export class KanbanBoardComponent {
  private taskService = inject(TaksService);
  private toast = inject(HotToastService);
  private modalService = inject(ModalService);
  tasks = signal<Tasks[]>([]);
  isModalOpen = signal(false);
  isLoading = signal(true); // Nuevo signal para el loading

  ngOnInit() {
    this.loadTasks(); // Carga inicial de tareas
    this.modalService.modalOpen$.subscribe(open => this.isModalOpen.set(open));
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.isLoading.set(false); // Ya se obtuvo la data
      },
      error: (err) => {
        console.error('Error al cargar tareas', err);
        this.isLoading.set(false); // Incluso en error, dejamos de cargar
      }
    });
  }

  get pendingTasks() {
    return this.tasks().filter(t => t.status_id === 1);
  }
  
  get inProgressTasks() {
    return this.tasks().filter(t => t.status_id === 2);
  }
  
  get completedTasks() {
    return this.tasks().filter(t => t.status_id === 3);
  }
  
  get overdueTasks() {
    return this.tasks().filter(t => t.status_id === 4);
  }
  

  addTask(task: { title: string; due_datetime: string }) {
    this.taskService.addTask(task).subscribe({
      next: (newTask) => {
        // Actualizamos la lista de tareas sin refrescar la página
        this.tasks.update(tasks => [...tasks, newTask]);
        // Cerramos el modal usando el servicio
        this.modalService.closeModal();

        this.toast.success('Tarea agregada correctamente!', {
          position: 'top-center',
          duration: 5000,
          dismissible: true,
        });
      },
      error: (err) => {
        console.error('Error al agregar tarea', err);
        this.toast.error('Error al agregar la tarea', {
          position: 'top-center',
          duration: 5000,
          dismissible: true,
        });
      }
    });
  }

  updateTaskStatus(taskId: number, newStatusId: number) {
    this.tasks.update(tasks =>
      tasks.map(task => task.id === taskId ? { ...task, status_id: newStatusId } : task)
    );
  }

  updateStatusTask(taskId: number) {
    this.taskService.updateStatusTask(taskId).subscribe({
      next: (updatedTask) => {
        this.tasks.update(tasks =>
          tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
        );
  
        // Mensaje según el status_id
        const statusMessages: Record<number, string> = {
          2: 'La tarea se ha movido a <b>"En progreso"</b>',
          3: 'La tarea se ha movido a <b>"Completado"</b>'
        };
  
        const message = statusMessages[updatedTask.status_id];
        this.toast.success(message, {
          position: 'top-center',
          duration: 5000,
          dismissible: true,
        });
      },
      error: (err) => {
        console.error('Error al actualizar el estado de la tarea', err)
        this.toast.error('¡Ups!, hubo un problema al actualizar el estado de la tarea', {
          position: 'top-center',
          duration: 5000,
          dismissible: true,
        })
      }
    });
  }
  
  deleteTask(taskId: number) { // <- Nueva función para eliminar
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(task => task.id !== taskId)); // <- Actualiza las tareas localmente
        this.toast.success('Se eliminó la tarea!', {
          position: 'top-center',
          duration: 5000,
          dismissible: true,
        });
      },
      error: (err) => {
        console.error('Error al eliminar la tarea', err)
        this.toast.error('¡Ups!, hubo un problema al eliminar la tarea', {
          position: 'top-center',
          duration: 5000,
          dismissible: true,
        });
      }
    });
  }

  openModal() { 
    this.isModalOpen.set(true); 
  }
  
  closeModal() { this.isModalOpen.set(false); }
}
