// state.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface StateBox {
  id: 'Scale' | 'Attacher' | 'Packer' | 'Closer';
  state: 'running' | 'alarm' | 'warning' | 'idle';
  icon: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private stateBoxes = signal<StateBox[]>([
    { id: 'Scale', state: 'running', icon: 'download', label: 'Scale' },
    { id: 'Attacher', state: 'alarm', icon: 'description', label: 'Attacher' },
    { id: 'Packer', state: 'running', icon: 'computer', label: 'Packer' },
    { id: 'Closer', state: 'warning', icon: 'apps', label: 'Closer' }
  ]);

  getStateBoxes = computed(() => this.stateBoxes());

  updateStateBox(id: StateBox['id'], newState: Partial<StateBox>) {
    this.stateBoxes.update(boxes => 
      boxes.map(box => box.id === id ? { ...box, ...newState } : box)
    );
  }

  saveStateToJSON(): string {
    return JSON.stringify(this.stateBoxes());
  }

  loadStateFromJSON(json: string) {
    try {
      const parsedState = JSON.parse(json) as StateBox[];
      this.stateBoxes.set(parsedState);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  }
}