import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OverviewService } from './overview.service';
import { QueryParam } from './model';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [OverviewService]
})
export class OverviewComponent implements OnInit {
  public queryParam: QueryParam;
  public cats: string[];

  constructor(private overviewService: OverviewService, private router: Router, private route: ActivatedRoute) {
    this.queryParam = new QueryParam();
    this.cats = ['企业', '专利', '工商', '其他'];
    this.initRouteListener();
  }

  ngOnInit() {}

  private initRouteListener() {
    this.route.queryParams.subscribe((params: Params) => {
      console.warn('router change');
      this.queryParam.key = params['key'] || null;
      this.queryParam.cat = params['cat'] || null;
      this.queryParam.page = params['page'] || 1;
      this.queryParam.sort = params['sort'] || null;
    });
  }

  public onSearch() {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: {
        key: this.queryParam.key
      }
    });
  }
}
