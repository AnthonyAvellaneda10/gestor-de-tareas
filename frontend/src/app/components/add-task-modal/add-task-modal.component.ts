import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ModalService } from '@services/modal.service';

// Validador personalizado para la fecha/hora
export function minDateTimeValidator(minDateTime: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const inputDate = new Date(control.value);
    return inputDate >= minDateTime ? null : { minDateTime: true };
  };
}

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task-modal.component.html',
})
export class AddTaskModalComponent {
  @Input() isOpen = false;
  @Output() onAdd = new EventEmitter<any>();
  private modalService = inject(ModalService);

  taskForm!: FormGroup;
  // Cadena para el atributo min del input (formato "YYYY-MM-DDThh:mm")
  minDateTimeStr: string = '';
  // Fecha mínima como objeto Date (hora actual + 1 hora)
  minDateTimeDate!: Date;

  ngOnInit() {
    // Calcula la fecha mínima permitida: hora actual + 1 hora
    const now = new Date();
    const minAllowed = new Date(now.getTime() + 4 * 60 * 1000);
    this.minDateTimeDate = minAllowed;

    // Formateamos la fecha en "YYYY-MM-DDThh:mm"
    const pad = (num: number) => (num < 10 ? '0' + num : num);
    const year = minAllowed.getFullYear();
    const month = pad(minAllowed.getMonth() + 1);
    const day = pad(minAllowed.getDate());
    const hours = pad(minAllowed.getHours());
    const minutes = pad(minAllowed.getMinutes());
    this.minDateTimeStr = `${year}-${month}-${day}T${hours}:${minutes}`;

    // Creamos el formulario reactivo
    this.taskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        // Permite letras, números y espacios. Ajusta el patrón según lo necesario.
        Validators.pattern(/^[A-Za-z0-9\s]+$/)
      ]),
      dueDate: new FormControl('', [
        Validators.required,
        minDateTimeValidator(minAllowed)
      ])
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const { title, dueDate } = this.taskForm.value;

    const localDate = new Date(dueDate);

    // Usamos la función helper para obtener la fecha en formato local ISO
    const isoLocal = this.getLocalISOString(localDate);

    const newTask = {
      title,
      due_datetime: isoLocal  // Ahora se conserva la hora local
    };

    this.onAdd.emit(newTask);
    this.taskForm.reset();
  }


  handleClose() {
    this.modalService.closeModal();
  }

  // Previene que se escriba manualmente en el input de fecha/hora
  preventInput(event: KeyboardEvent) {
    event.preventDefault();
  }

  // Getters para facilitar el acceso a los controles desde el template
  get titleControl() {
    return this.taskForm.get('title');
  }

  get dueDateControl() {
    return this.taskForm.get('dueDate');
  }

  private getLocalISOString(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return (
      date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds())
    );
  }

}
