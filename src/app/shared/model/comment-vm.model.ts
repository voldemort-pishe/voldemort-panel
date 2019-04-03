import { CandidateModel } from "@app/shared/model/candidate.model";
import { UserModel } from "@app/shared/model/user.model";
import { CommentModel } from "@app/shared/model/comment.model";


export class CommentContentModel {
  data: CommentModel;
  include: {
    owner: UserModel;
    candidate: CandidateModel;
  };
}
