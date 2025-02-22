import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { CreateTaskDTO } from '@interfaces/create-task.interface';
import { Tasks } from '@interfaces/tasks.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaksService {

  constructor() { }

  private http = inject(HttpClient);
  apiUrl = `${environment.API_URL}`


  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.apiUrl}/tasks`)
  }

  addTask(task: CreateTaskDTO): Observable<Tasks> {
    return this.http.post<Tasks>(`${this.apiUrl}/tasks`, task)
  }

  updateStatusTask(id: number): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.apiUrl}/tasks/${id}/status`, null);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`)
  }
}
