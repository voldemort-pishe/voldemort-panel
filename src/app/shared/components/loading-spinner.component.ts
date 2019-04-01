import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material';

@Component({
  selector: 'anms-loading-spinner',
  template: `
    <div class="container" [style.margin]="margin+'px'">
      <div [ngClass]="{'wrapper': !margin}">
        <mat-spinner class="spinner" [color]="color" [diameter]="diameter">
        </mat-spinner>
      </div>
    </div>
  `,
  styles: [`
    .container {
      height: 100%;
    }
    .wrapper {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .spinner {
      margin: 0 auto !important;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() color: ThemePalette;
  @Input() diameter: number;
  @Input() margin: number = 0;
}
