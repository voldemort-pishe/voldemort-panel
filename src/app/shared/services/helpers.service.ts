import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class HelpersService {

    private readonly englishNumbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    private readonly persianNumbers: string[] = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
    private readonly arabicNumbers: string[] = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠']; // it has the right order!

    constructor(
        private snackBar: MatSnackBar,
    ) { }

    showToast(message: string, duration: number = 3000): void {
        this.snackBar.open(message, null, { duration: duration });
    }

    toEnglishNumber(value: string): string {
        if (!value) return null;
        const numbersLen = this.englishNumbers.length;
        for (let i = 0; i < numbersLen; i++) {
            value = value.replace(new RegExp(this.persianNumbers[i], 'g'), this.englishNumbers[i])
                .replace(new RegExp(this.arabicNumbers[i], 'g'), this.englishNumbers[i]);
        }
        return value;
    }

    toPersianNumber(value: string): string {
        if (!value) return null;
        const numbersLen = this.englishNumbers.length;
        for (let i = 0; i < numbersLen; i++) {
            value = value.toString()
                .replace(new RegExp(this.englishNumbers[i], 'g'), this.persianNumbers[i])
                .replace(new RegExp(this.arabicNumbers[i], 'g'), this.persianNumbers[i]);
        }
        return value;
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
