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
  MatChipInputEvent,
  MatDialog,
  MatDialogRef,
  MatSnackBar,
} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {CompanyPipelineService, PERSIAN_DATE_FORMATS} from "@app/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CandidateService} from "@app/core/services/candidate.service";
import {CommentService} from "@app/core/services/comment.service";
import {CandidateMessageService} from "@app/core/services/candidate-message.service";
import {Principal} from "@app/core/auth/principal.service";

import {ContentCandidate} from "@app/shared/model/candidate.model";
import {CompanyPipelineVm} from "@app/shared/model/company-pipeline-vm.model";
import {PageCandidateMessageVm} from "@app/shared/model/page-candidate-message-vm.model";
import {User} from "@app/shared/model/user.model";
import {Comment} from "@app/shared/model/comment.model";
import {CommentVm} from "@app/shared/model/comment-vm.model";
import {CommentPage} from "@app/shared/model/comment-page.mode";
import {JalaliMomentDate} from "@app/core/adapter/jalali-moment-date";
import * as jalaliMoment from "jalali-moment";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CompanyMemberService} from "@app/core/services/company-member.service";
import {CompanyMemberPage} from "@app/shared/model/company-member/company-member-page.model";
import {CandidateScheduleMember} from "@app/shared/model/candidate-schedule/candidate-schedule-member.model";
import {CompanyMember} from "@app/shared/model/company-member/company-member.model";


@Component({
  selector: 'anms-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePageComponent implements OnInit, DoCheck {

  differ: any;
  companyPipeline;
  activeTab: any = {current:'background'};
  candidateId: number;
  candidate: ContentCandidate;
  candidateMessage: PageCandidateMessageVm;
  identityUser: User;
  commentText: string;
  commentList: CommentPage;


  constructor(private differs: KeyValueDiffers,
              private principal: Principal,
              private candidateService: CandidateService,
              private candidateMessageService: CandidateMessageService,
              private companyPipelineService: CompanyPipelineService,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.differ = differs.find({}).create();

  }

  ngOnInit() {
    this.route.params
      .subscribe( params => {
        this.candidateId = params.candidateId;
        this.candidateService
          .get(this.candidateId)
          .subscribe(
            (res: HttpResponse<ContentCandidate>) => this.onCandidateSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      } );
  }

  ngDoCheck() {
    let changes = this.differ.diff(this.activeTab);
    if(changes) {

      if(this.activeTab.current == 'activity'){
        this.candidateMessageService
          .getAllCandidateMessage(this.candidateId, 'createdDate,desc')
          .subscribe(
            (res: HttpResponse<PageCandidateMessageVm>) => this.onCandidateMessageSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }else if(this.activeTab.current == 'comments'){
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
      }
    }
  }

  onChangePipeline(candidate, $event){
    candidate.data.candidatePipeline = $event.value;
    this.candidateService
      .update(candidate.data)
      .subscribe(
        (res: HttpResponse<ContentCandidate>) => this.onCandidatePipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }

  openEmailDialog(){
    const dialogRef = this.dialog.open(
      CandidatePageEmailDialog,
      {
        data: {
          candidateId:this.candidateId
        }
      }
    );
  }

  openAddScheduleDialog(){
    const dialogRef = this.dialog.open(
      CandidatePageAddScheduleDialog,
      {
        data: {
          candidateId:this.candidateId
        }
      }
    );
  }

  sendComment(){
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

  private onCandidateSuccess(data: ContentCandidate){
    this.candidate = data;
    this.companyPipelineService
      .loadAll()
      .subscribe(
        (res: HttpResponse<CompanyPipelineVm>) => this.onCompanyPipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onCandidateMessageSuccess(data: PageCandidateMessageVm){
    console.log(data);
    this.candidateMessage = data;
  }

  private onCompanyPipelineSuccess(data: CompanyPipelineVm){
    this.companyPipeline = data.content;
  }

  private onCandidatePipelineSuccess(data: ContentCandidate){
    this.snackBar.open("مرحله‌ی کاندیدای مورد نظر به روز شد", "بستن", {
      duration: 2500
    });
  }

  private onCandidateGetCommentSuccess(data: CommentPage){
    console.log(data);
    this.commentList = data;
  }

  private onCandidateSendCommentSuccess(data: CommentVm){
    console.log(data);
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
export class CandidatePageEmailDialog implements OnInit{

  @ViewChild('candidateEmailForm') candidateEmailForm: ElementRef;
  candidateEmailFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<CandidatePageComponent>,
              private candidateMessageService: CandidateMessageService,
              private snackBar: MatSnackBar) {

    this.candidateEmailFormGroup = fb.group({
      subject: [null,Validators.required],
      message: [null,Validators.required],
      candidateId: new FormControl()
    });


  }

  ngOnInit(): void {
  }

  sendMessage(){
    this.candidateEmailFormGroup.patchValue({
      candidateId:this.data.candidateId
    });
    this.candidateMessageService
      .create(this.candidateEmailFormGroup.value)
      .subscribe(
        (res: HttpResponse<any>) => this.onCandidateMessageSuccess(),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onCandidateMessageSuccess(){
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
  providers: [
    { provide: DateAdapter, useClass: JalaliMomentDate, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePageAddScheduleDialog implements OnInit{

  @ViewChild('candidateAddScheduleForm') candidateAddScheduleForm: ElementRef;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  candidateAddScheduleFormGroup: FormGroup;
  date = new FormControl(jalaliMoment());
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();

  filteredMember: Observable<CompanyMember[]>;
  memberSet: CandidateScheduleMember[];
  companyMemberPage: CompanyMemberPage;

  fruits: string[] = ['Lemon'];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<CandidatePageComponent>,
              private companyMemberService: CompanyMemberService,
              private snackBar: MatSnackBar) {

    this.candidateAddScheduleFormGroup = fb.group({
      subject: [null,Validators.required],
      message: [null,Validators.required],
      candidateId: new FormControl()
    });


  }

  ngOnInit(): void {
    this.companyMemberService
      .getAll()
      .subscribe(
        (res: HttpResponse<CompanyMemberPage>) => this.onCompanyMemberSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }


  addSchedule(){
    
  }

  private onCompanyMemberSuccess(data: CompanyMemberPage){
    this.companyMemberPage = data;
    this.filteredMember = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((userEmail: string | null) => {
        return userEmail ? this._filter(userEmail) : this.companyMemberPage.content.map( e => { return e.data });
      }));
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

  private _filter(value: string): CompanyMember[] {
    return this.companyMemberPage.content
      .filter( e => {
        return e.data.userEmail.includes(value);
      })
      .map(e => {return e.data});
  }


}
