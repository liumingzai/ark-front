import { Component } from '@angular/core';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  constructor() {
    console.warn('************用户概览管理****************');
  }
}
