import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiRecordService } from './api-record.service';
import { QueryParam } from './model';
import { Account } from '../../../../account.model';

@Component({
  selector: 'api-record',
  templateUrl: './api-record.component.html',
  styleUrls: ['./api-record.component.scss'],
  providers: [ApiRecordService]
})
export class ApiRecordComponent implements OnInit {
  public accessApis: {};
  public queryParam: QueryParam;
  public totalRecords: number;
  public currentPage: number;
  private userType: number;
  public maxDate: Date;
  public minDate: Date;
  private userId: number;

  constructor(private apiRecordService: ApiRecordService, private router: Router, private route: ActivatedRoute) {
    this.queryParam = new QueryParam();
    this.minDate = new Date(1970, 0, 1);
    this.maxDate = new Date();
    this.userType = this.getUserType();
    this.initRouterListener();
  }

  ngOnInit() {}

  private getUserType(): number {
    const account: Account = JSON.parse(localStorage.getItem('account'));
    this.userId = account.id;
    return account.userType;
  }

  private initRouterListener() {
    this.route.queryParams.subscribe((params: Params) => {
      const { page = 1, startDate = null, endDate = null, url = null, apiName = null, uid = null } = params;
      this.queryParam = { page: +page, startDate, endDate, url, apiName, uid };
      this.currentPage = +page;

      if (this.userType === 1) {
        this.adminGetCountAsscssApi();
      } else if (this.userType === 3) {
        this.getCountAsscssApi();
      }
    });
  }

  public onSearch() {
    this.queryParam.startDate = this.queryParam.startDate && this.formatDate(this.queryParam.startDate);
    this.queryParam.endDate = this.queryParam.endDate && this.formatDate(this.queryParam.endDate);

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

  private adminGetCountAsscssApi() {
    this.apiRecordService.adminGetCountAsscssApi(this.queryParam).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.accessApis = data.data;
        this.totalRecords = data.size;
      }
    });
  }

  private getCountAsscssApi() {
    this.apiRecordService.getCountAsscssApi(this.queryParam.page, this.userId).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.accessApis = data.data;
        this.totalRecords = data.size;
      }
    });
  }
}
