import { Component, Input, Output, EventEmitter }from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
  standalone: true,
  selector: 'app-input-box',
  imports: [FormsModule],
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent {
  @Input() placeholder: string = 'Enter text';
  @Input() value: string = '';
  @Output() valueChange= new EventEmitter<string>();
  @Output() enterPressed = new EventEmitter<string>();

  onKeyDown(event: any) {
    if (event.key === 'Enter') {
      this.enterPressed.emit(this.value);
    }
  }

  onInputChange() {
    this.valueChange.emit(this.value);
    this.enterPressed.emit(this.value);
  }
}

