import { CandidateModel } from "@app/shared/model/candidate.model";
import { UserModel } from "@app/shared/model/user.model";
import { CandidateMessageModel } from "@app/shared/model/candidate-message.model";

export class CandidateMessageContentModel {
  data: CandidateMessageModel;
  include: {
    from: UserModel;
    to: UserModel;
    candidate: CandidateModel;
  };
}
