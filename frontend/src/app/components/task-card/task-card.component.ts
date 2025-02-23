import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tasks } from '@interfaces/tasks.interface';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DatePipe, LucideAngularModule],
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input() task!: Tasks;
  @Output() updateStatus = new EventEmitter<{ id: number; status: string }>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() updateStatusClick = new EventEmitter<number>();

  onUpdateStatus(status: string) {
    this.updateStatus.emit({ id: this.task.id, status });
  }

  onPlayClick() {
    this.updateStatusClick.emit(this.task.id);
  }

  onDeleteTask() {
    this.deleteTask.emit(this.task.id);
  }

}
