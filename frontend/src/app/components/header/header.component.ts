import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ModalService } from '@services/modal.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  private modalService = inject(ModalService);

  openModal() {
    this.modalService.openModal();
  }

}
