import { UserModel } from './user.model';
import { CandidateModel } from './candidate.model';

export interface CommentModel {
  id?: number;
  commentText: string;
  status?: boolean;
  userId: number;
  candidateId: number;
  createdDate?: string;
}

export interface CommentContentModel {
  data: CommentModel;
  include: {
    owner: UserModel;
    candidate: CandidateModel;
  };
}
