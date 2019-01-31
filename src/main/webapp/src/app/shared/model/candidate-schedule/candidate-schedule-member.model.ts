import {Moment} from 'moment';
import {CandidateScheduleMemberStatus} from "@app/shared/model/candidate-schedule/candidate-schedule-member-status.model";

export class CandidateScheduleMember {
 candidateScheduleId: number;
 createdDate: Moment;
 id: number;
 status: CandidateScheduleMemberStatus;
 userId: number;
}
