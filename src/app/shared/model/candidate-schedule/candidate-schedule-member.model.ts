import { CandidateScheduleMemberStatus } from "@app/shared/model/candidate-schedule/candidate-schedule-member-status.model";

export interface CandidateScheduleMemberModel {
    id?: number;
    userId?: number;
    candidateScheduleId?: number;
    status?: CandidateScheduleMemberStatus;
    createdDate?: string;
}
