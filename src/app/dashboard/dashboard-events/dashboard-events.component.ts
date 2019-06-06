import { Component, OnInit, Input } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status';
import { EventType } from '@app/shared/model/enumeration/event-type';
import { EventService } from '@app/shared/services/data/event.service';
import { EventContentModel } from '@app/shared/model/event.model';

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

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  events: EventContentModel[];
  displayedColumns: string[] = ['action', 'title', 'description'];

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.fetch();
  }

  fetch(): void {
    this.isLoading = true;
    this.isErrorOccured = false;
    this.eventService.getList(this.status, this.type, this.flag, this.ownerId).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.events = r.data;
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }
}
