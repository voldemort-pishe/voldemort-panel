import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fullName' })
export class FullNamePipe implements PipeTransform {
    transform(value: any): string {
        if (!value) return null;
        if (value.firstName && value.lastName)
            return `${value.firstName} ${value.lastName}`;
        else
            return value.firstName || value.lastName || value.name || value;
    }
}
