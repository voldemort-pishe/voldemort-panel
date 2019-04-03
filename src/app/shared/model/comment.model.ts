export class CommentModel {
  id?: number;
  commentText: string;
  status?: boolean;
  userId: number;
  candidateId: number;
  createdDate?: string;
}
