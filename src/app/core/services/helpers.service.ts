import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class HelpersService {

    constructor(
        private snackBar: MatSnackBar,
    ) { }

    showToast(message: string, duration: number = 3000): void {
        this.snackBar.open(message, null, { duration: duration });
    }
}
