import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserServer } from '../../service/user.service';
import { Account } from '../../../../account.model';
import { PaginatorModule } from '../../../../tool/paginator/paginator.module';

import { seaData, ListDatas } from '../../user-type';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponents implements OnInit {
  public datasTop: seaData[];
  public listTop: ListDatas[];
  public ListDatas: ListDatas | ListDatas[];
  public keyzhi: number;
  public account: Account;
  public severData: any[];
  public totalRecords: number;
  public pathname: string;
  public Delid: number;
  public Delind: number;
  public DelTitle: string;
  public upDate: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServer: UserServer
  ) {

  }
  public ngOnInit(): void {
    console.warn('****************table数据的表头和样式以及获取表数据包装**********************');
    this.account = JSON.parse(localStorage.getItem('account'));
    this.pathname = location.pathname;
    this.route.queryParams.subscribe((params: Params) => {
      this.datasTop = [
        {
          page: this.route.snapshot.queryParams['page'] || 1,
          bind: this.route.snapshot.queryParams['bind'] || null,
          username: this.route.snapshot.queryParams['userName'] || null,
          state: this.route.snapshot.queryParams['state'] || null,
          path: this.route.snapshot.queryParams['path'] || null,
          timesort: this.route.snapshot.queryParams['timesort'] || null,
          character: this.route.snapshot.queryParams['character'] || null,
          uid: this.route.snapshot.queryParams['uid'] || null,
          displayName: this.route.snapshot.queryParams['displayName'] || null,
          rolename: this.route.snapshot.queryParams['rolename'] || null,
          id: this.route.snapshot.queryParams['id'] || null,
          roleId: this.route.snapshot.queryParams['character'] || null,
          permissionName: this.route.snapshot.queryParams['permissionName'] || null
        }
      ];
      this.SwitchModule();
    });
  }
  public SwitchModule(): void {
    let dataUrl = '';
    switch (this.pathname) {
      case '/user/authoritycontrol':
        this.keyzhi = 1;
        dataUrl = 'admin/pm/getPermissions';
        this.ListDatas = {
          title: ['权限名称', '显示名称', '路径', '过滤器', '作用域', '权限状态', '操作'],
          className: ['col-md-2', 'col-md-2 max-w15  text-center', 'col-md-2 max-w12 text-center ',
            'col-md-2 max-w12 text-center ', 'col-md-2 max-w12 text-center ',
            'col-md-2 max-w12 text-center ', 'col-md-2 max-w12 text-center '],
          group: []
        };
        break;
      case '/user/usercontrol':
        this.keyzhi = 2;
        dataUrl = 'admin/um/getAccountList';
        this.ListDatas = {
          title: ['用户名', 'uid', 'email', '用户状态', '操作'],
          className: ['flex1 max-w15', 'flex1 col-md-4 p0', 'flex1 col-md-3 max-w20 p0',
            'flex1 col-md-2 max-w12 text-center p0', 'flex1 col-md-2'],
          group: []
        };
        break;
      case '用户订单':
        this.keyzhi = 3;
        this.ListDatas = {
          title: ['编号', '访问接口名称', '接口描述', '地址', '累计次数', '最后调用时间', '调用IP'],
          className: ['col-md-1'],
          group: [
            {
              value: ['1', '专利查询', '查询全部专利', 'http://XXXX.sss', '5000', '2017-09-28', '12.89.23.11']
            },
          ]
        };
        break;
      case '/user/rolecontrol':
        this.keyzhi = 4;
        dataUrl = '	admin/pm/getRole';
        this.ListDatas = {
          title: ['角色名称', '描述', '角色状态', '操作'],
          className: ['col-md-2', 'col-md-2', 'col-md-2 text-center max-w12', 'col-md-3'],
        };
        break;
      case '/user/roleauthoritycontrol':
        this.keyzhi = 6;
        if (this.datasTop[0].bind === 'Y') {
          dataUrl = '	admin/pm/getRoleBindPermissions';
        } else {
          dataUrl = '	admin/pm/getRoleUnbindPermissions';
        }
        this.ListDatas = {
          title: ['权限名称', '更新时间', '权限描述', '操作'],
          className: ['col-md-3', 'col-md-2', 'col-md-5 text-center', 'col-md-1']
        };
        break;
      default:
        this.keyzhi = 0;
    }
    if (this.keyzhi) {
      this.Getdata('GET', dataUrl, {
        pageNum: this.datasTop[0].page || null,
        id: this.datasTop[0].id || null,
        roleId: this.datasTop[0].roleId || null,
        path: this.datasTop[0].path || null,
        active: this.datasTop[0].state || null,
        createtimeSort: this.datasTop[0].timesort || null,
        username: this.datasTop[0].username || null,
        name: this.datasTop[0].rolename || null,
        state: this.datasTop[0].state || null,
        uid: this.datasTop[0].uid || null,
        permissionName: this.datasTop[0].permissionName || null,
      }, false, 'data');
    }

  }
  public Getdata(sertype: string, serurl: string, data?: any, isForm?: boolean, key?: string): void {
    this.userServer.FnUsers(sertype, serurl, data, isForm).subscribe((data: any) => {
      if ('2000' === data.code) {
        if (key === 'data') {
          this.severData = data.data;
          this.ListDatas['group'] = [];
          switch (this.keyzhi) {
            case 1:
              // tslint:disable-next-line:forin
              for (const i in data.data) {
                this.ListDatas['group'].push({
                  value: [
                    data.data[i].permissionName || '',
                    data.data[i].displayName || '',
                    data.data[i].path || '',
                    data.data[i].filters || '',
                    data.data[i].permissionScope || ''
                  ]
                });
              }
              break;
            case 2:
              // tslint:disable-next-line:forin
              for (const i in data.data) {
                this.ListDatas['group'].push({
                  value: [
                    '<a href="/user/scene?id=' + data.data[i].id + '&uid='
                    + data.data[i].uid + '&username=' + data.data[i].username + '">' + data.data[i].username + '</a>',
                    data.data[i].uid,
                    data.data[i].email
                  ]
                });
              }
              break;
            case 4:
              // tslint:disable-next-line:forin
              for (const i in data.data) {
                this.ListDatas['group'].push({
                  value: [
                    data.data[i].name,
                    data.data[i].description
                  ]
                });
              }
              break;
            case 6:
              // tslint:disable-next-line:forin
              for (const i in data.data) {
                this.ListDatas['group'].push({
                  value: [
                    data.data[i].permissionName || '',
                    this.FnGetDate(data.data[i].updateTime),
                    data.data[i].description || ''
                  ]
                });
              }
              break;
            default:
              console.warn('其他');
          }
          if (data.size) {
            this.totalRecords = data.size;
          }
        }
      }
    });
  }
  public FnChangeState(event: Event, id: any): void {
    const nowEvent = event.target as HTMLSelectElement;
    const selectind = nowEvent.selectedIndex;
    switch (this.keyzhi) {
      case 1:
        this.Getdata('PUT', 'admin/pm/updatePermissionsActive', {
          active: nowEvent.options[selectind].value,
          id
        });
        break;
      case 2:
        this.Getdata('PUT', 'admin/um/updateAccountState', {
          state: nowEvent.options[selectind].value,
          id
        });
        break;
      case 4:
        this.Getdata('PUT', 'admin/pm/updateRoleActive', {
          active: nowEvent.options[selectind].value,
          id
        });
        break;
      default:
        console.warn('其他');
    }
  }
  public FnDel(id: any, ind: number): void {
    this.Delid = id;
    this.Delind = ind;
    switch (this.keyzhi) {
      case 1:
        this.DelTitle = '权限';
        break;
      case 2:
        this.DelTitle = '用户';
        break;
      case 4:
        this.DelTitle = '角色';
        break;
      case 6:
        this.DelTitle = '权限';
      default:
        console.warn('其他');
    }
  }
  public FnSureDel(): void {
    switch (this.keyzhi) {
      case 1:
        this.Getdata('DELETE', 'admin/pm/deletePermissions', { id: this.Delid });
        break;
      case 2:
        this.Getdata('DELETE', 'admin/um/deleteAccount', { id: this.Delid });
        break;
      case 4:
        this.Getdata('DELETE', 'admin/pm/deleteRole', { id: this.Delid });
        break;
      case 6:
        if (this.datasTop[0].bind === 'N') {
          this.Getdata('POST', 'admin/pm/addRolePermissions', {
            id: this.datasTop[0].id,
            permissions: [{ id: this.Delid }]
          });
          break;
        } else {
          this.Getdata('POST', 'admin/pm/deleteRolePermissions', {
            id: this.datasTop[0].id,
            permissions: [{ id: this.Delid }]
          });
        }
      default:
    }
    this.severData.splice(this.Delind, 1);
  }
  public paginate(paginator: any) {
    const page = paginator.page + 1;
    this.datasTop[0].page = page;
    this.router.navigate([this.pathname], { queryParams: this.datasTop[0] });
  }

  public FnSend(ind: number): void {
    localStorage.setItem('ListData', JSON.stringify(this.severData[ind]));
  }

  public FnGetDate(time: any) {
    const NewDate = new Date(time);
    return NewDate.getFullYear() + '年' + (NewDate.getMonth() + 1) + '月' + NewDate.getDate() + '日';
  }

}
