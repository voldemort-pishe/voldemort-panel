import { Component, OnInit } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';
import { EventType } from '@app/shared/model/enumeration/event-type.model';

@Component({
  selector: 'anms-dashboard-comment',
  templateUrl: './dashboard-comment.component.html',
  styleUrls: ['./dashboard-comment.component.scss']
})
export class DashboardCommentComponent implements OnInit {

  EventStatus: typeof EventStatus = EventStatus;
  EventType: typeof EventType = EventType;
  
  constructor() { }

  ngOnInit() {
  }

}
