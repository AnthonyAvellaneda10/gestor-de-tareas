import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Task } from '../../core/interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '@components/task-card/task-card.component';
import { Tasks } from '@interfaces/tasks.interface';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, LucideAngularModule],
  templateUrl: './kanban-column.component.html',
})
export class KanbanColumnComponent {
  @Input() title = '';
  @Input() color = '';
  @Input() tasks: Tasks[] = [];
  @Output() addTask = new EventEmitter<void>();
  @Output() updateStatus = new EventEmitter<{ id: number; status: string }>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() updateTaskStatusClick = new EventEmitter<number>();

  onAddTask() {
    this.addTask.emit();
  }

  onUpdateStatus(id: number, status: string) {
    this.updateStatus.emit({ id, status });
  }

  onDeleteTask(id: number) { // <- Nueva función para eliminar
    this.deleteTask.emit(id);
  }

  onUpdateTaskStatusClick(id: number) { // <- Nueva función para actualizar el estado
    this.updateTaskStatusClick.emit(id);
  }
}
