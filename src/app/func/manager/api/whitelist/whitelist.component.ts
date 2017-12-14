import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WhitelistService } from './whitelist.service';
import { QueryParam } from './model';

@Component({
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.scss'],
  providers: [WhitelistService]
})
export class WhitelistComponent implements OnInit {
  public whitelists: {};
  public queryParam: QueryParam;
  public totalRecords: number;
  public currentPage: number;
  public maxDate: Date;
  public minDate: Date;
  public startDate: Date; // 实施时间

  constructor(private whitelistService: WhitelistService, private router: Router, private route: ActivatedRoute) {
    this.queryParam = new QueryParam();
    this.minDate = new Date(1970, 0, 1);
    this.maxDate = new Date();
    this.initRouterListener();
  }

  ngOnInit() {}

  public onSearch() {
    this.queryParam.dailyDate = this.queryParam.dailyDate && this.formatDate(this.queryParam.dailyDate);
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: this.queryParam
    });
  }

  private formatDate(date) {
    const d = new Date(date),
      year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  public paginate(paginator: any) {
    const page = paginator.page + 1;

    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        page
      }
    });
  }

  private initRouterListener() {
    this.route.queryParams.subscribe((params: Params) => {
      const { page = 1, uid = null, apiId = null, clientIp = null, url = null, dailyDate = null } = params;
      this.queryParam = { page: +page, uid, apiId, clientIp, url, dailyDate };
      this.currentPage = page;

      this.getSummaryWhiteListLog();
    });
  }

  private getSummaryWhiteListLog() {
    this.whitelistService.getSummaryWhiteListLog(this.queryParam).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.whitelists = data.data;

        this.totalRecords = data.size;
      }
    });
  }
}
