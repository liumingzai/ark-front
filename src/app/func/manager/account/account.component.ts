import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../../tool/animation';

@Component({
  templateUrl: './account.component.html',
  animations: [fadeInAnimation]
})
export class AccountComponent {
  @HostBinding('@fadeInAnimation') public fadeInAnimation = true;

  public prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'];
  }
}
