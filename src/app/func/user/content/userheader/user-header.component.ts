import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserServer } from '../../service/user.service';

import { seaData, ListDatas } from '../../user-type';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})

export class UserHeaderComponents implements OnInit {
  public datasTop: seaData[];
  public listTop: ListDatas[];
  public RoleIdArr: any[];
  @Input() public ListDatas: ListDatas;
  public keyzhi: number;
  public state: any;
  public timeSort: string;
  public character: string;
  public pathname: string;
  public DELstate: string | null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServer: UserServer
  ) { }
  public ngOnInit(): void {
    console.warn('******************头部内容*****************');
    this.route.queryParams.subscribe((params: Params) => {
      this.pathname = location.pathname;
      this.datasTop = [
        {
          id: this.route.snapshot.queryParams['id'],
          character: this.route.snapshot.queryParams['character'],
        }
      ];
      this.ListDatas = {
        userName: null,
        rolename: null,
        uid: null,
        ValidPath: null,
        permissionName: null,

      };
    });
  }
  public Getdata(sertype: string, serurl: string, data?: any, isForm?: boolean): void {
    this.userServer.FnUsers(sertype, serurl, data, isForm).subscribe((data: any) => {
      if ('2000' === data.code) {
        if (location.pathname === '/user/authoritycontrol') {
          this.RoleIdArr = data.data;
        }
      }
    });
  }
  public FnChangeModel(event: Event, key: string): void {
    const nowEvent = event.target as HTMLSelectElement;
    const selectind = nowEvent.selectedIndex;
    switch (key) {
      case '用户管理state':
        this.state = nowEvent.options[selectind].value;
        break;
      case 'Action':
        this.state = nowEvent.options[selectind].value;
        break;
      case 'TimeSort':
        this.timeSort = nowEvent.options[selectind].value;
        break;
      default:
        console.warn('其他');
    }
  }
  public FnDelModel(e: Event, key: string): void {
    const NowDelBtn = e.target as HTMLButtonElement;
    if (this.DELstate === 'true') {
      NowDelBtn.classList.remove('btn-danger');
      NowDelBtn.classList.add('btn-warning');
      this.DELstate = null;
    } else {
      NowDelBtn.classList.add('btn-danger');
      NowDelBtn.classList.remove('btn-warning');
      this.DELstate = 'true';
    }
    this.GoToRootPath(key);
  }

  public GoToRootPath(key: string): void {
    let queryParams = null;
    let rooturl = null;
    switch (key) {
      case '用户管理':
        rooturl = '/user/usercontrol';
        break;
      case '权限管理':
        rooturl = '/user/authoritycontrol';
        break;
      case '角色管理':
        rooturl = '/user/rolecontrol';
        break;
      case '接口总览':
        rooturl = '/user/interface';
        break;
      default:
        console.warn('其他');
    }
    queryParams = {
      state: this.state, // 有效标识
      uid: this.ListDatas.uid, // uid
      timesort: this.timeSort, // 时间排序
      character: this.character, // 角色管理Id
      path: this.ListDatas.ValidPath, // 权限管理路径
      userName: this.ListDatas.userName, // 用户列表用户名
      rolename: this.ListDatas.rolename, // 用户列表用户名
      permissionName: this.ListDatas.permissionName, // 权限管理名
      DELstate: this.DELstate // 删除状态
    };
    this.router.navigate([rooturl], { queryParams });
  }
}
