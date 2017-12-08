import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

import { seaData } from '../../user-type';

@Component({
  selector: 'user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})

export class UserContentComponents implements OnInit {
  public rooturl: string;
  public datasTop: seaData[];
  public type: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.route).subscribe((event) => {
        this.PDtype(location.pathname);
      });
  }
  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.PDtype(location.pathname);
    });
  }
  public PDtype(pathname: string): void {
    switch (pathname) {
      case '/user/authoritycontrol':
      case '/user/usercontrol':
      case '/user/rolecontrol':
      case '/user/roleauthoritycontrol':
        this.type = 'list';
        break;
      case '/user/interface':
        this.type = 'graphlist';
        break;
      case '/user/scene':
        this.type = 'scene';
        break;
      default:
        this.type = '';
    }
  }
}

