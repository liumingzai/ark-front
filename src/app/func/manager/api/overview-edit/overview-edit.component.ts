import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OverviewEditService } from './overview-edit.service';
import { API } from './api.model';
import { SnackBar } from '../../../../tool/snackbar';

interface Status {
  id: number;
  title: string;
}

@Component({
  selector: 'overview-edit',
  templateUrl: './overview-edit.component.html',
  styleUrls: ['./overview-edit.component.scss'],
  providers: [OverviewEditService]
})
export class OverviewEditComponent implements OnInit {
  public cats: string[];
  public api: API;
  private statusList: Array<Status>;
  public status: Status;
  private canSubmit: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private overviewEditService: OverviewEditService,
    private snackBar: SnackBar
  ) {
    this.cats = ['企业', '专利', '工商', '其他'];
    this.api = new API();

    this.statusList = [
      {
        id: 0,
        title: '新增接口'
      },
      {
        id: 1,
        title: '修改接口'
      }
    ];

    const params = this.route.snapshot.queryParams;
    if (params && params['id']) {
      this.status = this.statusList[1];
      this.api.apiId = params['id'];
    } else {
      this.status = this.statusList[0];
    }
  }

  ngOnInit() {}

  public save() {
    if (this.canSubmit) {
      if (this.validateNotNull(this.api)) {
        if (this.status.id) {
          this.editAPI();
        } else {
          this.addAPI();
        }
      } else {
        this.snackBar.warning('请您补全提交信息');
      }
    } else {
      this.snackBar.warning('正在提交，请稍候');
    }
  }

  /**
   * 校验 对象值不能为空
   *
   * @private
   * @param {{}} params
   * @returns {boolean}
   * @memberof OverviewEditComponent
   */
  private validateNotNull(params: {}): boolean {
    return Object.values(params).every((e: any) => !!e);
  }

  private addAPI() {
    this.overviewEditService.addApiOverview(this.api).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('新增成功');
        this.router.navigate(['../'], {
          relativeTo: this.route
        });
      }
    });
  }

  private editAPI() {
    this.overviewEditService.updateApiOverview(this.api).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('编辑成功');
        this.router.navigate(['../'], {
          relativeTo: this.route
        });
      }
    });
  }
}
