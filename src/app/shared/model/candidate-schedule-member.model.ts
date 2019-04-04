import { CandidateScheduleMemberStatus } from './enumeration/candidate-schedule-member-status.model';

export interface CandidateScheduleMemberModel {
    id?: number;
    userId?: number;
    candidateScheduleId?: number;
    status?: CandidateScheduleMemberStatus;
    createdDate?: string;
}
