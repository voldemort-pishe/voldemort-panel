import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateCandidateDialogComponent } from '../create-candidate-dialog/create-candidate-dialog.component';

@Component({
  selector: 'anms-candidate-list-menu',
  templateUrl: './candidate-list-menu.component.html',
  styleUrls: ['./candidate-list-menu.component.scss']
})
export class CandidateListMenuComponent implements OnInit {

  menuItems: { title: string; url: string; }[] = [
    {
      title: 'در انتظار',
      url: 'pending',
    },
    {
      title: 'در جریان',
      url: 'inprocess',
    },
    {
      title: 'رد شده',
      url: 'rejected',
    },
    {
      title: 'پذیرفته شده',
      url: 'accepted',
    },
    {
      title: 'همه',
      url: 'all',
    },
  ];

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  newCandidate(): void {
    this.dialog.open(CreateCandidateDialogComponent);
  }
}
