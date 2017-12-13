import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewDetailService } from './overview-detail.service';
import { APIDetail } from './api-detail.model';

@Component({
  selector: 'overview-detail',
  templateUrl: './overview-detail.component.html',
  styleUrls: ['./overview-detail.component.scss'],
  providers: [OverviewDetailService]
})
export class OverviewDetailComponent {
  public detail: APIDetail;
  public apiName: string;

  constructor(private overviewDetailService: OverviewDetailService, private route: ActivatedRoute) {
    this.detail = new APIDetail();
    const params = this.route.snapshot.params;
    this.getApiInfo(params['id']);
    this.apiName = params['name'];
  }

  private getApiInfo(id: string) {
    this.overviewDetailService.getApiInfo(id).subscribe((data: { code: string; data: APIDetail }) => {
      if ('2000' === data.code) {
        const { accessUrl, queryType, accessSample, returnSample, returnType, errorCodeList } = data.data;
        this.detail = { accessUrl, queryType, accessSample, returnSample, returnType, errorCodeList };
        data.data.paramList.forEach(e => {
          if (e.argumentType === 'header') {
            this.detail.header = e;
          } else if (e.argumentType === 'bodys') {
            this.detail.body = e;
          } else if (e.argumentType === 'querys') {
            this.detail.query = e;
          }
        });
      }
    });
  }
}
