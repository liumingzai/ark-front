import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserServer } from '../../service/user.service';
import { Account } from '../../../../account.model';

import { seaData, ListDatas } from '../../user-type';

@Component({
  selector: 'scene-content',
  templateUrl: './scene-content.component.html',
  styleUrls: ['./scene-content.component.scss']
})
export class SceneContentComponent implements OnInit {
  public rooturl: string;
  @Input() public ListDatas: ListDatas;
  public datasTop: seaData[];
  public Scenedata: any[] | any;
  public Token: any;
  public senceNum: number = 0;
  public active: string;
  public account: Account;
  public accountRole: number;

  constructor(private router: Router, private route: ActivatedRoute, private userServer: UserServer) {
    this.Scenedata = '';
    this.Token = '';
  }
  public ngOnInit(): void {
    this.account = JSON.parse(localStorage.getItem('account'));
    this.accountRole = this.account['roles'][0]['type'];
    this.route.queryParams.subscribe((params: Params) => {
      this.datasTop = [
        {
          childTitle: this.route.snapshot.queryParams['childTitle'],
          accountId: this.route.snapshot.queryParams['id'],
          uid: this.route.snapshot.queryParams['uid'],
          username: this.route.snapshot.queryParams['username'],
          type: this.route.snapshot.queryParams['type']
        }
      ];
      if (location.pathname === '/user/scene') {
        if (this.accountRole !== 1) {
          this.datasTop[0].accountId = this.account['id'];
        }
        this.GetScenedata('GET', 'common/getAppWhiteList', {
          accountId: this.datasTop[0].accountId
        });
      }
    });
    this.ListDatas = {
      wlContent: '',
      wlMaxCount: 0,
      applicationName: '',
      description: ''
    };
  }
  public GetScenedata(sertype: string, serurl: string, dataParam?: any, isForm?: boolean): void {
    this.userServer.FnUsers(sertype, serurl, dataParam, isForm).subscribe((data: any) => {
      if ('2000' === data.code) {
        if (data.data) {
          this.Scenedata = data.data.length > 0 ? data.data : null;
          if (this.Scenedata) {
            this.ListDatas.description = this.Scenedata[this.senceNum].description;
            this.ListDatas.wlMaxCount = this.Scenedata[this.senceNum].wlMaxCount;
            this.ListDatas.wlContent = this.Scenedata[this.senceNum].wlContent;
            this.ListDatas.applicationName = this.Scenedata[this.senceNum].applicationName;
            this.active = this.Scenedata[this.senceNum].active;
            this.Token = this.Scenedata[this.senceNum].userToken;
          }
        }
      }
    });
  }
  public GetTokendata(sertype: string, serurl: string, dataParam?: any, isForm?: boolean): void {
    this.userServer.FnUsers(sertype, serurl, dataParam, isForm).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.Token = data.data;
      }
    });
  }
  public FnTokenModel(): void {
    this.GetTokendata('GET', 'admin/um/getUserToken');
    this.Scenedata[this.senceNum].userToken = this.Token;
  }
  public FnAddModel(): void {
    const rooturl = '/user/scene/add';
    const queryParams = {
      accountId: this.datasTop[0].accountId
    };
    this.router.navigate([rooturl], { queryParams });
  }
  public FnDelModel(appId: any): void {
    const rooturl = '/user/scene';
    this.Scenedata.splice(this.senceNum, 1);
    this.GetScenedata('DELETE', 'common/deleteAppWhiteList', {
      accountId: this.datasTop[0].accountId,
      appMd5: this.Scenedata[this.senceNum].appMd5
    });
  }

  public FnChangeModel(event?: Event | null, val?: string, key?: string): void {
    switch (key) {
      case 'select':
        const nowEvent = event.target as HTMLSelectElement;
        const selectind = nowEvent.selectedIndex;
        this.senceNum = selectind;
        break;
      case 'readio':
        this.active = val;
    }
  }
  public FnSaveBtn(): void {
    this.GetScenedata('PUT', 'admin/um/updateAppWhiteList', {
      accountId: this.datasTop[0].accountId, // 用户id
      appMd5: this.Scenedata[this.senceNum].appMd5, // 应用id，
      applicationName: this.ListDatas.applicationName, // 应用名称
      description: this.ListDatas.description, // 应用描述
      userToken: this.Token, // user this.Token
      wlMaxCount: this.ListDatas.wlMaxCount, // "白名单最多数量",
      wlContent: this.ListDatas.wlContent, // "192.168.1.147,192.168.1.148
      active: this.active // 有效标识 ---Y：有效 N：无效
    });
  }
}
