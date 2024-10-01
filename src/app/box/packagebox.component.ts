// state-box.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { getIconForState } from '../utils/icon-utils';

@Component({
  selector: 'app-state-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packagebox.component.html',
  styleUrls: ['./packagebox.component.scss'] 
})
export class StateBoxComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() state: 'running' | 'alarm' | 'warning' | 'idle' = 'idle';

 
  getIconForState = getIconForState;
  


}
