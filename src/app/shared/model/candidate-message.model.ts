export class CandidateMessageModel {
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
