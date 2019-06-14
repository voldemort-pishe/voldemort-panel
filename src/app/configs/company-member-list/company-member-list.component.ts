import { Component, OnInit } from '@angular/core';
import { CompanyMemberService } from '@app/shared/services/data/company-member.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Pageable } from '@app/shared/model/pageable.model';
import { CompanyMemberContentModel } from '@app/shared/model/company-member.model';
import { InviteCompanyMemberComponent } from '../invite-company-member/invite-company-member.component';
import { HelpersService } from '@app/shared/services/helpers.service';

@Component({
  selector: 'anms-company-member-list',
  templateUrl: './company-member-list.component.html',
  styleUrls: ['./company-member-list.component.scss']
})
export class CompanyMemberListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'cellphone', 'department', 'position', 'operations'];
  dataSource: MatTableDataSource<CompanyMemberContentModel>;
  // rawData: Pageable<CompanyMemberContentModel>;
  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;

  constructor(
    private companyMemberService: CompanyMemberService,
    private helpersService: HelpersService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.fetch();
  }

  fetch(): void {
    this.isLoading = true;
    this.isErrorOccured = false;
    this.companyMemberService.getList().subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        // this.rawData = r.data;
        this.dataSource = new MatTableDataSource<CompanyMemberContentModel>(r.data.content);
      }
      else {
        this.error = r.niceErrorMessage;
      }
    });
  }

  deleteMember(member: CompanyMemberContentModel): void {
    this.companyMemberService.delete(member.data.id).subscribe(r => {
      if (r.success) {
        this.dataSource.data = this.dataSource.data.filter(i => i !== member);
      }
      const msg = r.success ? 'عضو با موفقیت حذف شد.' : r.niceErrorMessage;
      this.helpersService.showToast(msg);
    });
  }

  inviteMembers(): void {
    this.dialog.open(InviteCompanyMemberComponent, {
      width: '800px',
      height: '500px',
    }).afterClosed().subscribe(newMembers => {
      if (!newMembers) return;
      this.dataSource.data = [...this.dataSource.data, ...newMembers];
    });
  }
}
