import { Pipe, PipeTransform } from '@angular/core';
import { CandidateScheduleMemberStatus } from '../model/enumeration/candidate-schedule-member-status';

@Pipe({ name: 'candidateScheduleMemberStatus' })
export class CandidateScheduleMemberStatusPipe implements PipeTransform {
    transform(value: CandidateScheduleMemberStatus): string {
        switch (value) {
            case CandidateScheduleMemberStatus.ACCEPTED: return 'پذیرش شرکت در جلسه';
            case CandidateScheduleMemberStatus.REJECTED: return 'عدم پذیرش شرکت در جلسه';
            case CandidateScheduleMemberStatus.MAYBE: return 'احتمال شرکت در جلسه';
            default: return '[تعریف نشده]';
        }
    }
}
