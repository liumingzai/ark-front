import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../../tool/animation';

@Component({
  templateUrl: './api.component.html',
  animations: [fadeInAnimation]
})
export class ApiComponent {
  @HostBinding('@fadeInAnimation') public fadeInAnimation = true;

  public prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'];
  }
}
