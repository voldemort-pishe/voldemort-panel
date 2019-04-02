import { Component, OnInit } from '@angular/core';
import { EventService } from '@app/core/services/event.service';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';
import { EventCountModel } from '@app/shared/model/event-count.model';
import { EventType } from '@app/shared/model/enumeration/event-type.model';

@Component({
  selector: 'anms-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {

  EventType: typeof EventType = EventType;

  countUnread: number;
  countRead: number;
  countDone: number;
  countUnreadItems: { [key: string]: number } = {};

  menuItems: { title: string; icon: string; url: string; count: () => number; }[] = [
    {
      title: 'همه تازه‌ها',
      icon: 'inbox',
      url: 'unread',
      count: () => this.countUnread,
    },
    null,
    {
      title: 'مهم',
      icon: 'flag',
      url: 'important',
      count: () => null,
    },
    null,
    {
      title: 'زمان‌بندی',
      icon: 'schedule',
      url: 'schedule',
      count: () => this.countUnreadItems[EventType.SCHEDULE],
    },
    {
      title: 'بازخورد',
      icon: 'feedback',
      url: 'feedback',
      count: () => this.countUnreadItems[EventType.FEEDBACK],
    },
    {
      title: 'نظر',
      icon: 'comment',
      url: 'comment',
      count: () => this.countUnreadItems[EventType.COMMENT],
    },
    {
      title: 'ایمیل',
      icon: 'email',
      url: 'email',
      count: () => this.countUnreadItems[EventType.EMAIL],
    },
    {
      title: 'هشدار',
      icon: 'alarm',
      url: 'alarm',
      count: () => this.countUnreadItems[EventType.ALARM],
    },
    null,
    {
      title: 'انجام شده',
      icon: 'check_circle_outline',
      url: 'done',
      count: () => this.countDone,
    },
    {
      title: 'خوانده شده',
      icon: 'chrome_reader_mode',
      url: 'read',
      count: () => this.countRead,
    },
  ];

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.fetchCount();
  }

  fetchCount(): void {
    this.eventService.getListCount(EventStatus.UNREAD).subscribe(r => {
      if (r.success) {
        if (r.data.count !== 0) this.countUnread = r.data.count;
        r.data.items.forEach(i => this.countUnreadItems[i.type] = i.count);
      }
    });

    // this.eventService.getListCount(EventStatus.DONE).subscribe(r => {
    //   if (r.success && r.data.count !== 0) this.countDone = r.data.count;
    // });

    // this.eventService.getListCount(EventStatus.READ).subscribe(r => {
    //   if (r.success && r.data.count !== 0) this.countRead = r.data.count;
    // });
  }
}
