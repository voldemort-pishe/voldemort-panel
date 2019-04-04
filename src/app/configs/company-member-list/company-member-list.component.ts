import { Component, OnInit } from '@angular/core';
import { CompanyMemberService } from '@app/core';
import { MatTableDataSource } from '@angular/material';
import { CompanyMemberContentModel } from '@app/shared/model/company-member/company-member-vm.model';
import { PageableGeneric } from '@app/shared/model/pageable.model';

@Component({
  selector: 'anms-company-member-list',
  templateUrl: './company-member-list.component.html',
  styleUrls: ['./company-member-list.component.scss']
})
export class CompanyMemberListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'cellphone', 'department', 'position'];
  dataSource: MatTableDataSource<CompanyMemberContentModel>;
  rawData: PageableGeneric<CompanyMemberContentModel>;
  isLoading: boolean = false;

  constructor(private companyMemberService: CompanyMemberService) { }

  ngOnInit() {
    this.fetch();
  }

  fetch(): void {
    this.isLoading = true;
    this.companyMemberService.getList().subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.rawData = r.data;
        this.dataSource = new MatTableDataSource<CompanyMemberContentModel>(r.data.content);
      }
    });
  }
}
