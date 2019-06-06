import { Component, OnInit } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status';
import { EventType } from '@app/shared/model/enumeration/event-type';

@Component({
  selector: 'anms-dashboard-email',
  templateUrl: './dashboard-email.component.html',
  styleUrls: ['./dashboard-email.component.scss']
})
export class DashboardEmailComponent implements OnInit {

  EventStatus: typeof EventStatus = EventStatus;
  EventType: typeof EventType = EventType;
  
  constructor() { }

  ngOnInit() {
  }

}
