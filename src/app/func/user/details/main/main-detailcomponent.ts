import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { seaData } from '../../user-type';

@Component({
  selector: 'main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.scss']
})
export class MainDetailComponent implements OnInit {
  public rooturl: string;
  public datasTop: seaData[];
  constructor(private router: Router, private route: ActivatedRoute) {}
  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.datasTop = [
        {
          childTitle: this.route.snapshot.queryParams['childTitle']
        }
      ];
    });
  }
}
