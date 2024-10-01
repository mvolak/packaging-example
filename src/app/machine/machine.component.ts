// state-machine.component.ts
import { Component, Input } from '@angular/core';
import { StateBoxComponent } from '../box/packagebox.component';
import { StateBox } from '../service/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-state-machine',
  standalone: true,
  imports: [StateBoxComponent, CommonModule],
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']    
})
export class StateMachineComponent { 
  @Input() stateBoxes: StateBox[] = [];


  onRefresh(id: StateBox['id']) {
    console.log('Refresh requested for:', id);
  }

}
