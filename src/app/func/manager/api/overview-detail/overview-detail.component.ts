import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewDetailService } from './overview-detail.service';
import { APIDetail, Request } from './api-detail.model';
import { Account } from '../../../../account.model';
import { SnackBar } from '../../../../tool/snackbar';

@Component({
  selector: 'overview-detail',
  templateUrl: './overview-detail.component.html',
  styleUrls: ['./overview-detail.component.scss'],
  providers: [OverviewDetailService]
})
export class OverviewDetailComponent {
  public detail: APIDetail;
  public apiName: string;
  public isAdmin: boolean;
  private apiId: number;

  constructor(
    private overviewDetailService: OverviewDetailService,
    private route: ActivatedRoute,
    private snackBar: SnackBar
  ) {
    this.detail = new APIDetail();
    const params = this.route.snapshot.params;
    this.getApiInfo(params['id']);
    this.apiName = params['name'];
    this.apiId = params['id'];
    const account: Account = JSON.parse(localStorage.getItem('account'));
    this.isAdmin = account.userType === 1;
  }

  public onSubmit() {
    this.updateApiInfo();
  }

  public addNewCode() {
    if (!this.detail.errorCodeList) {
      this.detail.errorCodeList = [];
    }
    this.detail.errorCodeList.push({
      errorCode: null,
      errorDesc: null
    });
  }

  private getApiInfo(id: string) {
    this.overviewDetailService.getApiInfo(id).subscribe((data: { code: string; data: APIDetail }) => {
      if ('2000' === data.code) {
        const { accessUrl, queryType, accessSample, returnSample, returnType, errorCodeList } = data.data;
        this.detail = { accessUrl, queryType, accessSample, returnSample, returnType, errorCodeList };
        data.data.paramList.forEach(e => {
          if (e.argumentType === 'header') {
            this.detail.header = e || new Request();
          } else if (e.argumentType === 'bodys') {
            this.detail.body = e || new Request();
          } else if (e.argumentType === 'querys') {
            this.detail.query = e || new Request();
          }
        });
      }
    });
  }

  /**
   * 更新接口详情
   *
   * @private
   * @memberof OverviewDetailComponent
   */
  private updateApiInfo() {
    this.overviewDetailService.updateApiInfo(this.apiId, this.detail).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('更新成功');
      }
    });
  }
}
