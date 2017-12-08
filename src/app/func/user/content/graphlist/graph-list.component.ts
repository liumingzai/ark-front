import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { seaData } from '../../user-type';
import { UserServer } from '../../service/user.service';
import { PaginatorModule } from '../../../../tool/paginator/paginator.module';

@Component({
  selector: 'user-graphlist',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.scss']
})

export class GraphListComponents implements OnInit {
  public rooturl: string;
  public datasTop: seaData[];
  public severData: any[];
  public keyzhi: number;
  public pathname: string;
  public totalRecords: number;
  public Delind: number;
  public DelTitle: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServer: UserServer
  ) {

  }
  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.pathname = location.pathname;
      this.datasTop = [
        {
          page: this.route.snapshot.queryParams['page'] || 1,
          DELstate: this.route.snapshot.queryParams['DELstate'] || null // 删除状态
        }
      ];
      this.SwitchModule();
    });
  }

  public SwitchModule(): void {
    let dataUrl = '';
    switch (this.pathname) {
      case '/user/interface':
        this.keyzhi = 1;
        dataUrl = 'common/getApiOverview';
        break;
      default:
        this.keyzhi = 0;
    }
    // 弄了个keyzhi语义不理解，此处应该判断是否分页
    if (this.keyzhi) {
      this.Getdata('GET', dataUrl, {
        pageNum: this.datasTop[0].page || null
      }, false, 'data');
    }
  }

  // 此处只是获取接口概览数据调用
  public Getdata(sertype: string, serurl: string, data?: any, isForm?: boolean, key?: string): void {
    this.userServer.FnUsers(sertype, serurl, data, isForm).subscribe((data: any) => {
      if ('2000' === data.code) {
        if (key === 'data') {
          this.severData = data.data;
          console.warn(this.severData);
          // if (data.size) {
          //   this.totalRecords = data.size;
          // }
        }
      }
    });
  }

  public paginate(paginator: any) {
    const page = paginator.page + 1;
    this.datasTop[0].page = page;
    this.router.navigate([this.pathname], { queryParams: this.datasTop[0] });
  }

  public FnDel(ind: number): void {
    this.Delind = ind;
    switch (this.keyzhi) {
      case 1:
        this.DelTitle = '接口';
        break;
      default:
        console.warn('其他');
    }
  }

  public FnSend(ind: number): void {
    localStorage.setItem('detaildata', JSON.stringify(this.severData[ind]));
  }

  public FnSureDel(): void {
    switch (this.keyzhi) {
      case 1:
        this.Getdata('DELETE', 'admin/api/deleteApi', { apiId: this.severData[this.Delind].apiId });
        break;
      default:
        console.warn('其他');
    }
    this.severData.splice(this.Delind, 1);
  }
}
