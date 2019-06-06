import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { EventService } from '@app/shared/services/data/event.service';
import { EventStatus } from '@app/shared/model/enumeration/event-status';
import { AuthService } from '@app/shared/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'anms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private readonly appName: string = 'پیشه';

  pageTitle: string;
  countUnread: number;
  mobileQuery: MediaQueryList;

  constructor(
    private router: Router,
    private title: Title,
    private media: MediaMatcher,
    private authService: AuthService,
    private eventService: EventService,
  ) { }


  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');

    this.determineTitle(this.router.routerState.snapshot.root);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.determineTitle(this.router.routerState.snapshot.root);
      }
    });

    this.eventService.getListCount(EventStatus.UNREAD).subscribe(r => {
      if (r.success) this.countUnread = r.data.count;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  private determineTitle(routeSnapshot: ActivatedRouteSnapshot): void {
    const titles = [];
    this.checkRouteTree4TitleAndAppend(routeSnapshot.root, titles);
    const pt = titles.length > 0 ? titles[titles.length - 1] : null;
    this.pageTitle = pt || this.appName;
    this.title.setTitle(pt ? `${pt} - ${this.appName}` : this.appName)
  }

  private checkRouteTree4TitleAndAppend(routeSnapshot: ActivatedRouteSnapshot, titles: string[]): void {
    if (routeSnapshot.data.title != null)
      titles.push(routeSnapshot.data.title);

    if (routeSnapshot.firstChild)
      this.checkRouteTree4TitleAndAppend(routeSnapshot.firstChild, titles);
  }
}
