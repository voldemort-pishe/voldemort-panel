import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'anms-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() message: string;
  @Output() retry: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
