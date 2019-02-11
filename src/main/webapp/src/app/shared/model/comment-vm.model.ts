import {CandidateModel} from "@app/shared/model/candidate.model";
import {User} from "@app/shared/model/user.model";
import {Comment} from "@app/shared/model/comment.model";

export class Include {
  owner: User;
  candidate: CandidateModel;
}

export class CommentVm {
  data:Comment;
  include:Include;
}
