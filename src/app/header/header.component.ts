import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateBox } from '../service/state.service';
import { getIconForState } from '../utils/icon-utils';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() stateBoxes: StateBox[] = [];
  @Output() saveStateEvent = new EventEmitter<void>();
  @Output() loadStateEvent = new EventEmitter<Event>();
  currentTime: string = '';
  
  getIconForState = getIconForState;

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60000); // every minute
  }

  onSaveClick() {
    this.saveStateEvent.emit();
  }

  onLoadClick(event: Event) {
    this.loadStateEvent.emit(event);
  }

  private updateTime() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    this.currentTime = formatter.format(now).replace(',', '');
  }

}