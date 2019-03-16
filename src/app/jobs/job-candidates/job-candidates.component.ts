import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'anms-job-candidates',
  templateUrl: './job-candidates.component.html',
  styleUrls: ['./job-candidates.component.scss']
})
export class JobCandidatesComponent implements OnInit {

  jobId: number;

  constructor(
    // private jobService: JobService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.jobId = parseInt(params['id']);
    });
  }

}
