export class Comment {
  id: number;
  commentText: string;
  status: boolean;
  userId: number;
  candidateId: number;


  constructor(commentText: string,
              userId: number,
              candidateId: number) {
    this.commentText = commentText;
    this.userId = userId;
    this.candidateId = candidateId;
  }
}
