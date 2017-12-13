import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OverviewService } from './overview.service';
import { Account } from '../../../../account.model';
import { QueryParam, APIList } from './model';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [OverviewService]
})
export class OverviewComponent implements OnInit {
  public queryParam: QueryParam;
  public cats: string[];
  public totalRecords: number;
  public currentPage: number;
  public apis: APIList;
  private userType: number;

  constructor(private overviewService: OverviewService, private router: Router, private route: ActivatedRoute) {
    this.queryParam = new QueryParam();
    this.cats = ['企业', '专利', '工商', '其他'];
    this.userType = this.getUserType();
    this.initRouteListener();
  }

  ngOnInit() {}

  private initRouteListener() {
    this.route.queryParams.subscribe((params: Params) => {
      const {key = null, cat = null, page = 1, sort = null} = params;
      this.queryParam = {key, cat, page, sort};
      this.currentPage = page;

      if (this.userType === 1) {
        this.adminGetApiOverview();
      } else if (this.userType === 3) {
        this.getApiOverview();
      }
    });
  }

  private getUserType(): number {
    const account: Account = JSON.parse(localStorage.getItem('account'));
    return account.userType;
  }

  public onSearch() {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: {
        key: this.queryParam.key
      }
    });
  }

  public paginate(paginator: any) {
    const page = paginator.page + 1;

    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        page
      }
    })
  }

  private getApiOverview() {
    this.overviewService.getApiOverview(this.queryParam).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.apis = data.data;

        this.totalRecords = data.size;
      }
    });
  }

  private adminGetApiOverview() {
    this.overviewService.adminGetApiOverview(this.queryParam).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.apis = data.data;

        this.totalRecords = data.size;
      }
    });
  }
}
