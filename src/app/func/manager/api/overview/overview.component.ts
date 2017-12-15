import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OverviewService } from './overview.service';
import { Account } from '../../../../account.model';
import { QueryParam, APIList } from './model';
import swal from 'sweetalert2';
import { SnackBar } from '../../../../tool/snackbar';

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
  public canEdit: boolean = false;
  public publishStatus: Array<{ id: number; label: string }>;
  private userType: number;

  constructor(
    private overviewService: OverviewService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: SnackBar
  ) {
    this.queryParam = new QueryParam();
    this.cats = ['企业', '专利', '工商', '其他'];
    this.publishStatus = [
      {
        id: null,
        label: '全部'
      },
      {
        id: 0,
        label: '仅保存'
      },
      {
        id: 1,
        label: '保存并发布'
      }
    ];
    this.userType = this.getUserType();
    this.initRouteListener();
  }

  ngOnInit() {}

  private initRouteListener() {
    this.route.queryParams.subscribe((params: Params) => {
      const { key = null, cat = null, page = 1, sort = null, publish = null } = params;
      this.queryParam = { key, cat, page: +page, sort: +sort, publish: publish === null ? null : +publish };
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
    });
  }

  public onChangePublishStatus(e) {
    let param;
    if (e.value === 0 || e.value) {
      param = { page: 1, publish: e.value };
    } else {
      param = { page: 1, publish: '' };
    }
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: param
    });
  }

  public onChangeEdit() {
    this.canEdit = !this.canEdit;
  }

  public onDelete(id: string) {
    swal({
      title: '您确定要删除吗？',
      text: '该操作将彻底删除，并且不能恢复!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#dc3545',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(result => {
      if (result.value) {
        this.doDelete(id);
      } else if (result.dismiss === 'cancel') {
        // console.warn('cancel');
      }
    });
  }

  private doDelete(id: string) {
    this.overviewService.deleteApi(id).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('删除成功');
        this.getApiOverview();
      }
    });
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
