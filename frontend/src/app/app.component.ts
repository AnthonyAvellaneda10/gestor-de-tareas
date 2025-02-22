import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { KanbanBoardComponent } from "./components/kanban-board/kanban-board.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, KanbanBoardComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
