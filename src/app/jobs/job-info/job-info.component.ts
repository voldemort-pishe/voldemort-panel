import { Component, OnInit } from '@angular/core';
import { JobService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { JobContentModel } from '@app/shared/model/job.model';

@Component({
  selector: 'anms-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {

  isLoading: boolean = false;
  id: number;
  model: JobContentModel;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
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
    this.jobService.getDetail(this.id).subscribe(r => {
      this.isLoading = false;
      if (r.success)
        this.model = r.data;
    });
  }

}
