import {
  Component,
  DoCheck,
  ElementRef,
  Inject,
  KeyValueDiffers,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatDatepickerInputEvent,
  MatDialog,
  MatDialogRef,
  MatSnackBar
} from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { CompanyPipelineService } from "@app/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CandidateService } from "@app/core/services/candidate.service";
import { CommentService } from "@app/core/services/comment.service";
import { CandidateMessageService } from "@app/core/services/candidate-message.service";
import { Principal } from "@app/core/auth/principal.service";

import { CandidateContentModel } from "@app/shared/model/candidate.model";
import { CompanyPipelineVm } from "@app/shared/model/company-pipeline-vm.model";
import { PageCandidateMessageVm } from "@app/shared/model/page-candidate-message-vm.model";
import { UserModel } from "@app/shared/model/user.model";
import { Comment } from "@app/shared/model/comment.model";
import { CommentVm } from "@app/shared/model/comment-vm.model";
import { CommentPage } from "@app/shared/model/comment-page.mode";
import * as jalaliMoment from "jalali-moment";
import { Moment } from "jalali-moment";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CompanyMemberService } from "@app/core/services/company-member.service";
import { CompanyMemberPage } from "@app/shared/model/company-member/company-member-page.model";
import { CandidateScheduleMember } from "@app/shared/model/candidate-schedule/candidate-schedule-member.model";
import { CompanyMemberModel } from "@app/shared/model/company-member/company-member.model";
import { CandidateSchedule } from "@app/shared/model/candidate-schedule/candidate-schedule.model";
import { CandidateScheduleService } from "@app/core/services/candidate-schedule.service";
import { CandidateScheduleVm } from "@app/shared/model/candidate-schedule/candidate-schedule-vm.model";
import { CandidateSchedulePage } from "@app/shared/model/candidate-schedule/candidate-schedule-page.model";
import { environment } from '@env/environment';
import { ApiService } from '@app/core/services/api.service';
import { SubmitFeedbackComponent } from '../submit-feedback/submit-feedback.component';
import { PageableGeneric } from '@app/shared/model/pageable.model';
import { FeedbackContentModel } from '@app/shared/model/feedback.model';
import { FeedbackRating } from '@app/shared/model/enumeration/feedback-rating';

@Component({
  selector: 'anms-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePageComponent implements OnInit, DoCheck {

  FeedbackRating: typeof FeedbackRating = FeedbackRating;

  differ: any;
  companyPipeline;
  activeTab: any = { current: 'background' };
  candidateId: number;
  candidate: CandidateContentModel;
  candidateMessage: PageCandidateMessageVm;
  identityUser: UserModel;
  commentText: string;
  commentList: CommentPage;
  candidateScheduleList: CandidateSchedulePage;

  feedbacks: FeedbackContentModel[];
  feedbackGroups: any[];

  public get fileUrl(): string {
    if (this.candidate && this.candidate.data.fileId != null)
      return `${environment.serverApiUrl}file/load/${this.candidate.data.fileId}`;
    else return null;
  }

  constructor(private differs: KeyValueDiffers,
    private principal: Principal,
    private candidateService: CandidateService,
    private candidateMessageService: CandidateMessageService,
    private companyPipelineService: CompanyPipelineService,
    private commentService: CommentService,
    private candidateScheduleService: CandidateScheduleService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.differ = differs.find({}).create();

  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.candidateId = params.candidateId;
        this.candidateService
          .get(this.candidateId)
          .subscribe(
            (res: HttpResponse<CandidateContentModel>) => this.onCandidateSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      });

    this.apiService.get<PageableGeneric<FeedbackContentModel>>(`feedback/candidate/${this.candidateId}`).subscribe(r => {
      this.feedbacks = r.data.content;
      const gs = [];
      this.groupBy(this.feedbacks, f => f.data.rating).forEach((items, key) => {
        gs.push({
          rating: key,
          n: items.length,
        });
      });
      this.feedbackGroups = gs;
    });
  }

  // https://stackoverflow.com/a/38327540
  groupBy<T>(collection: T[], keyGetter: ((value: T) => any)): Map<any, T[]> {
    const map = new Map();
    collection.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection)
        map.set(key, [item]);
      else
        collection.push(item);
    });
    return map;
  }

  newFeedback(): void {
    this.dialog.open(SubmitFeedbackComponent, { data: { candidateId: this.candidateId } });
  }

  ngDoCheck() {
    let changes = this.differ.diff(this.activeTab);
    if (changes) {

      if (this.activeTab.current == 'activity') {
        this.candidateMessageService
          .getAllCandidateMessage(this.candidateId, 'createdDate,desc')
          .subscribe(
            (res: HttpResponse<PageCandidateMessageVm>) => this.onCandidateMessageSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      } else if (this.activeTab.current == 'comments') {
        this.principal.identityUser()
          .then(res => {
            this.identityUser = res;
          });
        this.commentService
          .getCandidateComment(this.candidateId)
          .subscribe(
            (res: HttpResponse<CommentPage>) => this.onCandidateGetCommentSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          )
      } else if (this.activeTab.current == 'schedule') {
        this.candidateScheduleService
          .byCandidateId(this.candidateId)
          .subscribe(
            (res: HttpResponse<CandidateSchedulePage>) => this.onCandidateScheduleSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          )
      }
    }
  }

  onChangePipeline(candidate, $event) {
    candidate.data.candidatePipeline = $event.value;
    this.candidateService
      .update(candidate.data)
      .subscribe(
        (res: HttpResponse<CandidateContentModel>) => this.onCandidatePipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }

  openEmailDialog() {
    const dialogRef = this.dialog.open(
      CandidatePageEmailDialog,
      {
        data: {
          candidateId: this.candidateId
        }
      }
    );
  }

  openAddScheduleDialog() {
    const dialogRef = this.dialog.open(
      CandidatePageAddScheduleDialog,
      {
        data: {
          candidateId: this.candidateId
        }
      }
    );
  }

  sendComment() {
    this.commentService
      .create(
        new Comment(
          this.commentText,
          this.identityUser.id,
          this.candidateId
        )
      )
      .subscribe(
        (res: HttpResponse<CommentVm>) => this.onCandidateSendCommentSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onCandidateSuccess(data: CandidateContentModel) {
    this.candidate = data;
    this.companyPipelineService
      .loadAll()
      .subscribe(
        (res: HttpResponse<CompanyPipelineVm>) => this.onCompanyPipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onCandidateMessageSuccess(data: PageCandidateMessageVm) {
    console.log(data);
    this.candidateMessage = data;
  }

  private onCompanyPipelineSuccess(data: CompanyPipelineVm) {
    this.companyPipeline = data.content;
  }

  private onCandidatePipelineSuccess(data: CandidateContentModel) {
    this.snackBar.open("مرحله‌ی کاندیدای مورد نظر به روز شد", "بستن", {
      duration: 2500
    });
  }

  private onCandidateGetCommentSuccess(data: CommentPage) {
    this.commentList = data;
  }

  private onCandidateScheduleSuccess(data: CandidateSchedulePage) {
    this.candidateScheduleList = data;
  }

  private onCandidateSendCommentSuccess(data: CommentVm) {
    this.commentText = null;
    this.snackBar.open("نظر شما با موفقیت ارسال شد", "بستن", {
      duration: 2500
    });
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

}

@Component({
  selector: 'candidate-page-email-dialog',
  templateUrl: './candidate-page-email.component.html',
  styleUrls: ['./candidate-page-email.component.scss']
})
export class CandidatePageEmailDialog implements OnInit {

  @ViewChild('candidateEmailForm') candidateEmailForm: ElementRef;
  candidateEmailFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CandidatePageComponent>,
    private candidateMessageService: CandidateMessageService,
    private snackBar: MatSnackBar) {

    this.candidateEmailFormGroup = fb.group({
      subject: [null, Validators.required],
      message: [null, Validators.required],
      candidateId: new FormControl()
    });


  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.candidateEmailFormGroup.patchValue({
      candidateId: this.data.candidateId
    });
    this.candidateMessageService
      .create(this.candidateEmailFormGroup.value)
      .subscribe(
        (res: HttpResponse<any>) => this.onCandidateMessageSuccess(),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onCandidateMessageSuccess() {
    this.dialogRef.close();
    this.snackBar.open("پیام شما با موفقیت ارسال شد", "بستن", {
      duration: 2500
    });
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

}

@Component({
  selector: 'candidate-page-add-schedule-dialog',
  templateUrl: './candidate-page-add-schedule.component.html',
  styleUrls: ['./candidate-page-add-schedule.component.scss'],
  // providers: [
  //   { provide: DateAdapter, useClass: JalaliMomentDate, deps: [MAT_DATE_LOCALE] },
  //   { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  // ],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePageAddScheduleDialog implements OnInit {

  @ViewChild('candidateAddScheduleForm') candidateAddScheduleForm: ElementRef;
  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  candidateAddScheduleFormGroup: FormGroup;
  today = jalaliMoment();
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredMember: Observable<CompanyMemberModel[]>;
  memberSet: Set<CandidateScheduleMember> = new Set();
  memberList: Array<CandidateScheduleMember> = [];
  companyMemberPage: CompanyMemberPage;
  timeList: Moment[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CandidatePageComponent>,
    private companyMemberService: CompanyMemberService,
    private snackBar: MatSnackBar,
    private candidateScheduleService: CandidateScheduleService) {

    this.candidateAddScheduleFormGroup = fb.group({
      date: [this.today, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      location: [null, Validators.required],
      description: [null, Validators.required],
      memberCtrl: [null, Validators.required]
    });

    this.generateTime();

  }

  ngOnInit(): void {
    this.companyMemberService
      .getAll()
      .subscribe(r => {
        if (r.success) this.onCompanyMemberSuccess(r.data);
        else this.onError(r.error.message);
      });
  }

  remove(member: CandidateScheduleMember): void {
    this.memberSet.delete(member);

    let index = this.memberList
      .map(function (e) {
        return e.userId;
      }).indexOf(member.userId);
    if (index > -1) {
      console.log(member);
      this.memberList.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    let candidateScheduleMember = new CandidateScheduleMember();
    candidateScheduleMember.userId = event.option.value.id;
    candidateScheduleMember.candidateScheduleId = Number(this.data.candidateId);
    this.memberList.push(candidateScheduleMember);
    this.memberSet.add(event.option.value);
    this.memberInput.nativeElement.value = '';
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.generateTime();
  }

  addSchedule() {
    let candidateSchedule: CandidateSchedule = new CandidateSchedule();
    candidateSchedule.member = this.memberList;
    candidateSchedule.candidateId = this.data.candidateId;
    candidateSchedule.description = this.candidateAddScheduleFormGroup.value.description;
    candidateSchedule.startDate = this.candidateAddScheduleFormGroup.value.startTime;
    candidateSchedule.endDate = this.candidateAddScheduleFormGroup.value.endTime;
    candidateSchedule.location = this.candidateAddScheduleFormGroup.value.location;
    if (this.candidateAddScheduleFormGroup.valid) {
      this.candidateScheduleService
        .create(candidateSchedule)
        .subscribe(
          (res: HttpResponse<CandidateScheduleVm>) => this.onCreateScheduleSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  private onCompanyMemberSuccess(data: CompanyMemberPage) {
    this.companyMemberPage = data;
    this.filteredMember = this.candidateAddScheduleFormGroup.controls['memberCtrl'].valueChanges.pipe(
      startWith(null),
      map((userEmail: string | null) => {
        return userEmail ? this._filter(userEmail) : this.companyMemberPage.content.map(e => { return e.data });
      }));
  }

  private onCreateScheduleSuccess(data: CandidateScheduleVm) {
    this.dialogRef.close();
    this.snackBar.open("مصاحبه با موفقیت ثبت شد", "بستن", {
      duration: 2500
    });
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }


  private _filter(value: string): CompanyMemberModel[] {
    return this.companyMemberPage.content
      .filter(e => {
        return e.data.userEmail.includes(value);
      })
      .map(e => { return e.data });
  }


  private generateTime() {
    this.timeList = [];
    let quarterHours = ["00", "30"];
    for (let _i = 0; _i < 24; _i++) {
      for (let _j = 0; _j < 2; _j++) {
        this.timeList.push(
          jalaliMoment(this.candidateAddScheduleFormGroup.value.date
            .format("YYYY-MM-DD") + " " + String(_i).padStart(2, '0') + ":" + quarterHours[_j])
        );
      }
    }
  }

}
