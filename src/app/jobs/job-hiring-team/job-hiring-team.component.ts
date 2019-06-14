import { Component, OnInit } from '@angular/core';
import { JobHireTeamService } from '@app/shared/services/data/job-hire-team.service';
import { ActivatedRoute } from '@angular/router';
import { JobHireTeamRole } from '@app/shared/model/enumeration/job-hire-team-role';
import { JobHireTeamContentModel } from '@app/shared/model/job-hiring-team.model';
import { HelpersService } from '@app/shared/services/helpers.service';
import { CompanyMemberContentModel } from '@app/shared/model/company-member.model';
import { CompanyMemberService } from '@app/shared/services/data/company-member.service';

@Component({
  selector: 'anms-job-hiring-team',
  templateUrl: './job-hiring-team.component.html',
  styleUrls: ['./job-hiring-team.component.scss']
})
export class JobHiringTeamComponent implements OnInit {

  JobHireTeamRoles: JobHireTeamRole[] = Object.values(JobHireTeamRole);

  id: number;
  items: JobHireTeamContentModel[];
  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  displayedColumns: string[] = ['name', 'role', 'createdDate', 'operations'];
  companyMembers: CompanyMemberContentModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private jobHireTeamService: JobHireTeamService,
    private companyMemberService: CompanyMemberService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.fetch();
    });

    this.companyMemberService.getList().subscribe(r => {
      if (r.success)
        this.companyMembers = r.data.content;
    });
  }

  fetch(): void {
    if (isNaN(this.id)) return;

    this.isLoading = true;
    this.isErrorOccured = false;
    this.jobHireTeamService.getList(this.id).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.items = r.data;
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  addItem(): void {
    this.items = this.items.concat({
      data: {
        jobId: this.id,
      },
    });
  }

  saveItem(item: JobHireTeamContentModel): void {
    if (item.data.id == null) {
      this.jobHireTeamService.createList(this.id, [item.data]).subscribe(r => {
        if (r.success) {
          item.data = r.data[0].data;
          item.include = r.data[0].include;
        }
        const msg = r.success ? 'عضو با موفقیت ذخیره شد.' : r.niceErrorMessage;
        this.helpersService.showToast(msg);
      });
    }
    else {
      // TODO
      // this.jobHireTeamService.edit(item).subscribe(r => {
      //   const msg = r.success ? 'فیلد با موفقیت ذخیره شد.' : r.niceErrorMessage;
      //   this.helpersService.showToast(msg);
      // });
    }
  }

  deleteItem(item: JobHireTeamContentModel): void {
    if (item.data.id == null) {
      this.items = this.items.filter(i => i !== item);
    }
    else {
      this.jobHireTeamService.delete(item.data.id).subscribe(r => {
        if (r.success)
          this.items = this.items.filter(i => i !== item);
        const msg = r.success ? 'عضو با موفقیت حذف شد.' : r.niceErrorMessage;
        this.helpersService.showToast(msg);
      });
    }
  }
}
