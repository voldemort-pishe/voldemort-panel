import {CandidateModel} from "@app/shared/model/candidate.model";
import {UserModel} from "@app/shared/model/user.model";
import {CandidateMessage} from "@app/shared/model/candidate-message.model";

export class Include {
  from: UserModel;
  to: UserModel ;
  candidate: CandidateModel;
}

export class CandidateMessageVm {
  data:CandidateMessage;
  include:Include;
}
