import { Pipe, PipeTransform } from '@angular/core';
import { ScheduleStatus } from '../model/enumeration/schedule-status';

@Pipe({ name: 'scheduleStatus' })
export class ScheduleStatusPipe implements PipeTransform {
    transform(value: ScheduleStatus): string {
        switch (value) {
            case ScheduleStatus.SCHEDULED: return 'زمان‌بندی شده';
            case ScheduleStatus.OVERSTATED: return 'برگزار شده';
            case ScheduleStatus.CANCELED: return 'لغو شده';
            default: return '[تعریف نشده]';
        }
    }
}
