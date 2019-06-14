import { Pipe, PipeTransform } from '@angular/core';
import { CandidateState } from '../model/enumeration/candidate-state';

@Pipe({ name: 'candidateState' })
export class CandidateStatePipe implements PipeTransform {
    transform(value: CandidateState): string {
        switch (value) {
            case CandidateState.Pending: return 'در انتظار';
            case CandidateState.InProcess: return 'در جریان';
            case CandidateState.Rejected: return 'رد شده';
            case CandidateState.Accepted: return 'پذیرفته شده';
            default: return '[تعریف نشده]';
        }
    }
}
