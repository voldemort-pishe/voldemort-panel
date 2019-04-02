import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anms-candidate-list-menu',
  templateUrl: './candidate-list-menu.component.html',
  styleUrls: ['./candidate-list-menu.component.scss']
})
export class CandidateListMenuComponent implements OnInit {

  menuItems: { title: string; url: string; }[] = [
    {
      title: 'فعال',
      url: 'pending',
    },
    {
      title: 'در جریان',
      url: 'inprocess',
    },
    {
      title: 'استخدام شده',
      url: 'accepted',
    },
    {
      title: 'رد شده',
      url: 'rejected',
    },
    {
      title: 'همه',
      url: 'all',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
