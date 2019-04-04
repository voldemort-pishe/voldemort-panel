import { UserModel } from './user.model';
import { CandidateModel } from './candidate.model';

export interface CandidateMessageModel {
  id: number;
  messageId: string;
  candidateId: number;
  createdDate: Date;
  fromUserId: number;
  toUserId: number;
  message: string;
  owner: string;
  parentId: number;
  subject: string;
}

export interface CandidateMessageContentModel {
  data: CandidateMessageModel;
  include: {
    from: UserModel;
    to: UserModel;
    candidate: CandidateModel;
  };
}
