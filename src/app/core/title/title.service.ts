import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';

@Injectable()
export class TitleService {

  title: string;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private titleService: Title,
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getDeepestTitle(this.router.routerState.snapshot.root);
        if (title != null && title.startsWith('anms'))
          this.translateService.get(title).subscribe(v => this.setTitle(v));
        else
          this.setTitle(title);
      }
    });
  }

  private setTitle(value: string): void {
    this.title = value;
    if (this.title)
      this.titleService.setTitle(`${this.title} - ${environment.appName}`);
    else
      this.titleService.setTitle(environment.appName);
  }

  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
    if (routeSnapshot.firstChild)
      title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
    return title;
  }
}
