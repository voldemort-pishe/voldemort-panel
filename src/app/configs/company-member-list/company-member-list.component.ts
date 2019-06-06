import { Component, OnInit } from '@angular/core';
import { CompanyMemberService } from '@app/shared/services/data/company-member.service';
import { MatTableDataSource } from '@angular/material';
import { Pageable } from '@app/shared/model/pageable.model';
import { CompanyMemberContentModel } from '@app/shared/model/company-member.model';

@Component({
  selector: 'anms-company-member-list',
  templateUrl: './company-member-list.component.html',
  styleUrls: ['./company-member-list.component.scss']
})
export class CompanyMemberListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'cellphone', 'department', 'position'];
  dataSource: MatTableDataSource<CompanyMemberContentModel>;
  rawData: Pageable<CompanyMemberContentModel>;
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
