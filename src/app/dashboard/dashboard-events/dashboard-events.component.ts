import { Component, OnInit, Input } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';
import { EventType } from '@app/shared/model/enumeration/event-type.model';

@Component({
  selector: 'anms-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.scss']
})
export class DashboardEventsComponent implements OnInit {

  @Input() status: EventStatus;
  @Input() type: EventType;
  @Input() flag: boolean;
  @Input() ownerId: number;

  constructor() { }

  ngOnInit() {
  }

}
