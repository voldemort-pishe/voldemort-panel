import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { routeAnimations, TitleService } from '@app/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { LoginService } from "@app/core/login/login.service";
import { EventService } from '@app/core/services/event.service';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';


@Component({
  selector: 'anms-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
  animations: [routeAnimations]
})
export class SecureComponent implements OnInit, OnDestroy {

  @HostBinding('class') componentCssClass;

  mobileQuery: MediaQueryList;
  countUnread: number;

  public get pageTitle(): string {
    return this.titleService.title;
  }

  private readonly _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private titleService: TitleService,
    private eventService: EventService,
    private loginService: LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.eventService.getListCount(EventStatus.UNREAD).subscribe(r => {
      if (r.success) this.countUnread = r.data.count;
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
