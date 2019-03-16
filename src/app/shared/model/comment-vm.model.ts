import {CandidateModel} from "@app/shared/model/candidate.model";
import {UserModel} from "@app/shared/model/user.model";
import {Comment} from "@app/shared/model/comment.model";

export class Include {
  owner: UserModel;
  candidate: CandidateModel;
}

export class CommentVm {
  data:Comment;
  include:Include;
}
