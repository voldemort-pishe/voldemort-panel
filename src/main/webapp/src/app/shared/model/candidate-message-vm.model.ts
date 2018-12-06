import {ICandidate} from "@app/shared/model/candidate.model";
import {User} from "@app/shared/model/user.model";
import {CandidateMessage} from "@app/shared/model/candidate-message.model";

export class Include {
  from: User;
  to: User ;
  candidate: ICandidate;
}

export class CandidateMessageVm {
  data:CandidateMessage;
  include:Include;
}
