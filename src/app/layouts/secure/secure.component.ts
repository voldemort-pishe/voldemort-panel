import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { routeAnimations } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { LoginService } from "@app/core/login/login.service";


@Component({
  selector: 'anms-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
  animations: [routeAnimations]
})
export class SecureComponent implements OnInit, OnDestroy {

  @HostBinding('class') componentCssClass;

  mobileQuery: MediaQueryList;
  pageTitle;

  private readonly _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private loginService: LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    router.events.subscribe((val) => {
      this.pageTitleChanger();
    });

  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  private pageTitleChanger() {
    let lastChild = this.route.snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { title } = lastChild.data;
    if (title == null) return;
    this.translate
      .get(title)
      .pipe(filter(translatedTitle => translatedTitle !== title))
      .subscribe(translatedTitle => {
        this.pageTitle = translatedTitle
      });
  }


}
