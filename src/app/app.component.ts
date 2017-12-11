import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(event => this.activatedRoute)
      .subscribe(event => {
        // do relative router action.
        // console.warn(event);
        // console.warn(event.component);
      });
  }
}
