import { Pipe, PipeTransform } from '@angular/core';
import { JobType } from '../model/enumeration/job-type';

@Pipe({ name: 'jobType' })
export class JobTypePipe implements PipeTransform {
    transform(value: JobType): string {
        switch (value) {
            case JobType.FullTime: return 'تمام وقت';
            case JobType.PartTime: return 'پاره وقت';
            case JobType.Remote: return 'دورکاری';
            default: return '[تعریف نشده]';
        }
    }
}
