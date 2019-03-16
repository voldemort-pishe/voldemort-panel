import { Component, OnInit } from '@angular/core';
import { JobHireTeamService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { JobHireTeamContentModel } from '@app/shared/model/job-hiring-team/job-hiring-team-vm.model';
import { MatTableDataSource } from '@angular/material';
import { JobHireTeamRole } from '@app/shared/model/enumeration/job-hire-team-role';

@Component({
  selector: 'anms-job-hiring-team',
  templateUrl: './job-hiring-team.component.html',
  styleUrls: ['./job-hiring-team.component.scss']
})
export class JobHiringTeamComponent implements OnInit {

  JobHireTeamRole: typeof JobHireTeamRole = JobHireTeamRole;

  isLoading: boolean = false;
  id: number;
  rawData: JobHireTeamContentModel[];
  displayedColumns: string[] = ['name', 'createdDate', 'role'];
  dataSource: MatTableDataSource<JobHireTeamContentModel>;

  constructor(
    private route: ActivatedRoute,
    private jobHireTeamService: JobHireTeamService,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.fetch();
    });
  }

  fetch(): void {
    if (isNaN(this.id)) return;

    this.isLoading = true;
    this.jobHireTeamService.getListByJobId(this.id).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.rawData = r.data;
        this.dataSource = new MatTableDataSource<JobHireTeamContentModel>(r.data);
      }
    });
  }
}
