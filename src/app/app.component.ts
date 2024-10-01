import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StateMachineComponent } from './machine/machine.component';
import { HeaderComponent } from './header/header.component';
import { StateBox, StateService } from './service/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, StateMachineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public stateService: StateService) {}
  title = 'b-packaging';
  stateBoxes: StateBox[] = [];

  ngOnInit() {
    this.stateBoxes = this.stateService.getStateBoxes();
  }

  onRefresh(id: 'Scale' | 'Attacher' | 'Packer' | 'Closer') {
    // Simulate a state change
    this.stateService.updateStateBox(id, { state: 'running' });
    setTimeout(() => {
      this.stateService.updateStateBox(id, { state: 'idle' });
    }, 2000);
  }

  saveState() {
    const jsonState = this.stateService.saveStateToJSON();
    const blob = new Blob([jsonState], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'state.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  loadState(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        this.stateService.loadStateFromJSON(contents);
        this.stateBoxes = this.stateService.getStateBoxes();
      };
      reader.readAsText(file);
    }
  }


}
