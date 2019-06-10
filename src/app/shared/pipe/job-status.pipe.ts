import { Pipe, PipeTransform } from '@angular/core';
import { JobStatus } from '../model/enumeration/job-status';

@Pipe({ name: 'jobStatus' })
export class JobStatusPipe implements PipeTransform {
    transform(value: JobStatus): string {
        switch (value) {
            case JobStatus.Open: return 'باز';
            case JobStatus.Close: return 'بسته';
            default: return '[تعریف نشده]';
        }
    }
}
