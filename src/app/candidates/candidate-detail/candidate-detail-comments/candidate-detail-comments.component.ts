import { Component, OnInit } from '@angular/core';
import { CommentService } from '@app/shared/services/data/comment.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '@app/shared/model/user.model';
import { CommentModel, CommentContentModel } from '@app/shared/model/comment.model';
import { HelpersService } from '@app/shared/services/helpers.service';
import { AccountService } from '@app/shared/services/data/account.service';

@Component({
  selector: 'anms-candidate-detail-comments',
  templateUrl: './candidate-detail-comments.component.html',
  styleUrls: ['./candidate-detail-comments.component.scss']
})
export class CandidateDetailCommentsComponent implements OnInit {

  candidateId: number;

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  comments: CommentContentModel[];

  identityUser: UserModel;
  newCommentText: string;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private commentsService: CommentService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'));
      if (!isNaN(id)) {
        this.candidateId = id;
        this.fetch();
      }
    });

    this.accountService.get().subscribe(r => {
      this.identityUser = r.data;
    });
  }

  fetch() {
    if (this.candidateId == null) return;

    this.isLoading = true;
    this.isErrorOccured = false;
    this.commentsService.getListByCandidate(this.candidateId).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.comments = r.data.content;
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  submitComment(): void {
    if (!this.newCommentText) return;

    const newComment: CommentModel = {
      commentText: this.newCommentText,
      userId: this.identityUser.id,
      candidateId: this.candidateId,
    };
    this.commentsService.create(newComment).subscribe(r => {
      const msg = r.success ? 'نظر شما با موفقیت ثبت شد.' : r.niceErrorMessage;
      this.helpersService.showToast(msg);
      if (r.success) {
        this.newCommentText = null;
        this.fetch();
      }
    });
  }
}
