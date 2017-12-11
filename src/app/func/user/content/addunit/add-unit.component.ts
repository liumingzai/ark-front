import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserServer } from '../../service/user.service';
import { Account } from '../../../../account.model';
import { seaData, ListDatas } from '../../user-type';

@Component({
  selector: 'add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponents implements OnInit {
  public rooturl: string[];
  public filters: string;
  public permissionScope: string;
  public datasTop: seaData[];
  public FilterDatas: any[];
  public ScopeDatas: any[];
  public upData: any;
  public noth1query: any;
  public pathname: string;
  public childTitle: string;
  public state: any;
  public RuleObj: ListDatas;
  public account: Account;
  public accountRole: number;
  public Token: any;
  public dataurl: string;
  public datatype: string;
  public Actiokey: boolean;
  @Input() public ListDatas: ListDatas;
  constructor(private router: Router, private route: ActivatedRoute, private userServer: UserServer) {
    this.ScopeDatas = [];
    this.FilterDatas = [];
  }
  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.pathname = location.pathname;
      this.account = JSON.parse(localStorage.getItem('account'));
      this.upData = JSON.parse(localStorage.getItem('ListData')) || null;
      this.noth1query = JSON.parse(localStorage.getItem('noth1query')) || null;
      this.accountRole = this.account['roles'][0]['type']; // 用户的类型（管理员，普通用户，临港用户）
      // datasTop包装了id，用户id 应用id
      this.datasTop = [
        {
          id: this.route.snapshot.queryParams['id'],
          accountId: this.route.snapshot.queryParams['accountId'],
          applicationId: this.route.snapshot.queryParams['applicationId']
        }
      ];
      this.ListDatas = {
        userName: this.upData ? this.upData.username : '',
        Email: this.upData ? this.upData.email : '',
        phone: this.upData ? this.upData.phone : '',
        wlContent: '',
        wlMaxCount: 0,
        applicationName: '',
        description: this.upData ? this.upData.description : '',
        displayName: this.upData ? this.upData.displayName : '',
        permissionName: this.upData ? this.upData.permissionName : '',
        ValidPath: this.upData ? this.upData.path : '',
        rolename: this.upData ? this.upData.name : '',
        active: this.upData ? this.upData.active : 'Y'
      };
      this.FnSwitchModel();
      switch (this.pathname) {
        case '/user/rolecontrol/add':
        case '/user/rolecontrol/updata':
          this.rooturl = ['/user/rolecontrol'];
          this.Actiokey = true;
          this.ListDatas.active = null;
          break;
        case '/user/usercontrol/add':
        case '/user/usercontrol/updata':
          this.rooturl = ['/user/usercontrol'];
          this.Actiokey = true;
          this.RuleObj = {
            RuleArr: [],
            RuleAddArr: [],
            RuleIdArr: []
          };
          this.Getdata('GET', 'admin/pm/getAllRole', null, false, 'RuleId');
          break;
        case '/user/authoritycontrol/add':
        case '/user/authoritycontrol/updata':
          this.rooturl = ['/user/authoritycontrol'];
          this.Actiokey = true;
          this.Getdata('GET', 'admin/pm/getPermissionScope', null, false, 'Scope');
          this.Getdata('GET', 'admin/pm/getPermissionFilters', null, false, 'Filter');
          break;
      }
    });
  }

  public FnSwitchModel(): void {
    switch (this.pathname) {
      case '/user/interface/add':
        this.childTitle = '新增接口';
        break;
      case '/user/interface/updata':
        this.childTitle = '修改当前接口';
        break;
      case '/user/rolecontrol/add':
        this.childTitle = '新增角色';
        this.dataurl = 'admin/pm/addRole';
        this.datatype = 'POST';
        break;
      case '/user/rolecontrol/updata':
        this.childTitle = '修改当前角色';
        this.dataurl = 'admin/pm/updateRole';
        this.datatype = 'PUT';
        break;
      case '/user/authoritycontrol/add':
        this.childTitle = '新增权限';
        this.dataurl = 'admin/pm/addPermissions';
        this.datatype = 'POST';
        break;
      case '/user/authoritycontrol/updata':
        this.childTitle = '编辑当前权限';
        this.dataurl = 'admin/pm/updatePermissions';
        this.datatype = 'PUT';
        break;
      case '/user/usercontrol/add':
        this.childTitle = '新增用户';
        this.dataurl = 'admin/um/addAccount';
        this.datatype = 'POST';
        break;
      case '/user/usercontrol/updata':
        this.childTitle = '编辑当前用户';
        this.state = this.upData ? this.upData.state : null;
        this.Actiokey = true;
        this.dataurl = 'admin/um/updateAccount';
        this.datatype = 'PUT';
        break;
      case '/user/scene/add':
        this.childTitle = '新增场景';
        this.rooturl = ['/user/scene'];
        if (this.accountRole === 1) {
          this.dataurl = 'admin/um/addAppWhiteList';
        } else {
          this.dataurl = 'common/addAppWhiteList';
        }
        this.datatype = 'POST';
        this.Actiokey = true;
        break;
    }
  }

  // 接口调用
  public Getdata(sertype: string, serurl: string, data?: any, isForm?: boolean, key?: string): void {
    this.userServer.FnUsers(sertype, serurl, data, isForm).subscribe((data: any) => {
      if ('2000' === data.code) {
        if (key === 'Scope') {
          this.ScopeDatas = data.data;
          this.permissionScope = this.ScopeDatas[0];
        }
        if (key === 'Filter') {
          this.FilterDatas = data.data;
          this.filters = this.FilterDatas[0];
        }
        if (key === 'RuleId') {
          this.RuleObj.RuleArr = data.data;
        }
      }
    });
  }

  // 获取token数据
  public GetTokendata(sertype: string, serurl: string, data?: any, isForm?: boolean): void {
    this.userServer.FnUsers(sertype, serurl, data, isForm).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.Token = data.data;
      }
    });
  }

  // 获取用户token
  public FnTokenModel(): void {
    this.GetTokendata('GET', 'admin/um/getUserToken');
  }

  public FnSelRole(id?: any, ind?: number, work?: string): void {
    if (work === 'add') {
      this.RuleObj.RuleIdArr.push({ id });
      this.RuleObj.RuleAddArr.push(this.RuleObj.RuleArr[ind]);
      this.RuleObj.RuleArr.splice(ind, 1);
    } else {
      this.RuleObj.RuleArr.push(this.RuleObj.RuleAddArr[ind]);
      this.RuleObj.RuleIdArr.splice(ind, 1);
      this.RuleObj.RuleAddArr.splice(ind, 1);
    }
    console.warn(this.RuleObj.RuleIdArr);
  }

  // 保存
  public FnSureSave() {
    this.UseData(this.datatype, this.dataurl);
    this.router.navigate(this.rooturl, { queryParams: this.noth1query });
  }

  public FnChangeModel(event: Event, key?: string): void {
    const nowEvent = event.target as HTMLSelectElement;
    const selectind = nowEvent.selectedIndex;
    switch (key) {
      case '权限管理filters':
        this.filters = nowEvent.options[selectind].value;
        break;
      case '权限管理Scope':
        this.permissionScope = nowEvent.options[selectind].value;
        break;
      case '用户管理state':
        this.state = nowEvent.options[selectind].value;
        break;
      case '其他active':
        this.ListDatas.active = nowEvent.options[selectind].value;
        break;
      default:
        console.warn('其他');
    }
    console.warn(this.ListDatas.active);
  }

  public UseData(type: string, dataurl: string) {
    this.Getdata(type, dataurl, {
      id: this.datasTop[0].id, // 用户id
      state: this.state, // 更改用户状态
      userToken: this.Token || null,
      accountId: this.datasTop[0].accountId || null, // 用户id
      applicationName: this.ListDatas.applicationName || null, // 应用名称
      description: this.ListDatas.description || null, // 应用描述
      active: this.ListDatas.active || null, // 有效标识 ---Y：有效 N：无效
      applicationId: this.datasTop[0].applicationId || null, // 应用id，
      wlMaxCount: this.ListDatas.wlMaxCount || null, // "白名单最多数量",
      wlContent: this.ListDatas.wlContent || null, // "192.168.1.147,192.168.1.148
      displayName: this.ListDatas.displayName || null, // 显示名称
      permissionName: this.ListDatas.permissionName || null, // 权限名称
      path: this.ListDatas.ValidPath || null, // 接口路径
      filters: this.filters || null, // 过滤器
      permissionScope: this.permissionScope || null, // 作用域
      name: this.ListDatas.rolename || null, // 角色名
      username: this.ListDatas.userName || null,
      phone: this.ListDatas.phone || null,
      email: this.ListDatas.Email || null,
      roles: this.RuleObj ? this.RuleObj.RuleIdArr : null // 用户添加角色集合
    });
  }

  // public GoToContent(rootname: string): void {
  //   this.rooturl = '/user/' + rootname + '/content';
  // }
}
