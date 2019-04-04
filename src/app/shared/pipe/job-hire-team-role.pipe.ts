import { Pipe, PipeTransform } from '@angular/core';
import { JobHireTeamRole } from '../model/enumeration/job-hire-team-role';

@Pipe({ name: 'jobHireTeamRole' })
export class JobHireTeamRolePipe implements PipeTransform {
    transform(value: JobHireTeamRole): string {
        switch (value) {
            case JobHireTeamRole.HiringManager: return 'مدیر استخدام';
            case JobHireTeamRole.Recruiter: return 'کارشناس استخدام';
            case JobHireTeamRole.Coordinator: return 'مسئول هماهنگی';
            default: return '[تعریف نشده]';
        }
    }
}
