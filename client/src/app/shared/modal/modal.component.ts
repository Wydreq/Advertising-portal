import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() message: string | undefined;
  @Output() close = new EventEmitter<void>();

  constructor() {}

  onClose() {
    this.close.emit();
  }
}
