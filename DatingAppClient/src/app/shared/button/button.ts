
// src/app/shared/ui/button/ui-button.component.ts
import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'error';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  standalone: true,
  selector: 'ui-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styles: [`
    :host { display: inline-flex; }
    /* Strong focus ring aligned to design tokens */
    button:focus-visible {
      box-shadow:
        0 0 0 2px rgba(255,255,255,0.9),
        0 0 0 4px #4FD7B8; /* primary-400 */
    }
    /* Active micro-interaction */
    button:active { transform: translateY(0.5px) scale(0.98); }
  `]
})
export class UiButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() fullWidth = false;
  @Input() disabled = false;
  @Input() ariaLabel?: string;

  @HostBinding('attr.dir') dirAttr = document?.documentElement?.getAttribute('dir') || 'ltr';
}
