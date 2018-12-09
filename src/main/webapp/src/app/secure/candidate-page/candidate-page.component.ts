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
import {CandidateService} from "@app/core/services/candidate.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ContentCandidate} from "@app/shared/model/candidate.model";
import {CompanyPipelineVm} from "@app/shared/model/company-pipeline-vm.model";
import {CompanyPipelineService} from "@app/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CandidateMessageService} from "@app/core/services/candidate-message.service";
import {PageCandidateMessageVm} from "@app/shared/model/page-candidate-message-vm.model";


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


  constructor(private differs: KeyValueDiffers,
              private candidateService: CandidateService,
              private candidateMessageService: CandidateMessageService,
              private companyPipelineService: CompanyPipelineService,
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
