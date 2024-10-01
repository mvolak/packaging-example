
export function getIconForState(state: 'running' | 'alarm' | 'warning' | 'idle'): string {
    switch (state) {
      case 'running':
        return 'refresh';
      case 'alarm':
        return 'error';
      case 'warning':
        return 'warning';
      case 'idle':
      default:
        return 'info';
    }
  }