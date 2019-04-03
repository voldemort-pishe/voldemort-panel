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

    // https://stackoverflow.com/a/38327540
    groupBy<T>(collection: T[], keyGetter: ((value: T) => any)): Map<any, T[]> {
        const map = new Map();
        collection.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection)
                map.set(key, [item]);
            else
                collection.push(item);
        });
        return map;
    }
}
