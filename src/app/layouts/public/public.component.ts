import {Component, HostBinding, OnInit} from '@angular/core';
import {routeAnimations} from '@app/core';


@Component({
  selector: 'anms-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  animations: [routeAnimations]
})
export class PublicComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  constructor() { }

  ngOnInit() {
  }

}
