import { Component } from '@angular/core';

@Component({
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent {
  constructor() {
    console.warn('************用户记录管理****************');
  }
}
