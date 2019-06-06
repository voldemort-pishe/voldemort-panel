import { Component, OnInit } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status';

@Component({
  selector: 'anms-dashboard-unread',
  templateUrl: './dashboard-unread.component.html',
  styleUrls: ['./dashboard-unread.component.scss']
})
export class DashboardUnreadComponent implements OnInit {

  EventStatus: typeof EventStatus = EventStatus;

  constructor() { }

  ngOnInit() {
  }

}
