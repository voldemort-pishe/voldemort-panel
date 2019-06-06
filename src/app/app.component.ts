import { Component, OnInit } from '@angular/core';
import { routeAnimations } from './core/animations/route.animations';

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
