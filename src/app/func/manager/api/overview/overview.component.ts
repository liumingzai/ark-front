import { Component, OnInit } from '@angular/core';
import { OverviewService } from './overview.service';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [OverviewService]
})
export class OverviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
