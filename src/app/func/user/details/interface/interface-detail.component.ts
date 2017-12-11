import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserServer } from '../../service/user.service';

import { seaData, interfaceData } from '../../user-type';

@Component({
  selector: 'interface-detail',
  templateUrl: './interface-detail.component.html',
  styleUrls: ['./interface-detail.component.scss']
})
export class HickyDetailComponent implements OnInit {
  public rooturl: string;
  public datasTop: seaData[];
  @Input() public severData: any;
  @Input() public interfaceDataArr: any[];
  @Input() public interfaceData: any;
  public DetailData: any;
  public HeaderlData: any[] = [];
  public queryData: any[] = [];
  public bodyData: any[] = [];
  public HTMLkey: string = 'showdata';
  public TYPEkey: string = '';
  public workKey: string = '';
  public arrind: any;
  public typeind: any;
  constructor(private router: Router, private route: ActivatedRoute, private userServer: UserServer) {
    this.FninterfaceData();
  }
  public ngOnInit(): void {
    this.DetailData = JSON.parse(localStorage.getItem('detaildata'));
    this.route.queryParams.subscribe((params: Params) => {
      this.datasTop = [
        {
          apiId: this.route.snapshot.queryParams['apiId']
        }
      ];
      this.Getdata(
        'GET',
        'common/getApiInfo',
        {
          apiId: this.datasTop[0].apiId
        },
        false,
        'data'
      );
    });
  }
  public Getdata(sertype: string, serurl: string, dataParam?: any, isForm?: boolean, key?: string): void {
    this.userServer.FnUsers(sertype, serurl, dataParam, isForm).subscribe((data: any) => {
      if ('2000' === data.code) {
        if (key === 'data') {
          this.severData = data.data;
          this.severData.returnSample = this.severData.returnSample.replace(/\,/g, ',\r\n');
          data.data.paramList['forEach']((item: any, i: number) => {
            if (item.argumentType === 'header') {
              this.HeaderlData.push({
                item,
                ind: i
              });
            } else if (item.argumentType === 'querys') {
              this.queryData.push({
                item,
                ind: i
              });
            } else {
              this.bodyData.push({
                item,
                ind: i
              });
            }
          });
        }
      }
    });
  }
  public FninterfaceData(): void {
    this.interfaceData = {
      argumentType: null,
      queryColumnName: null,
      queryColumnType: 'String',
      queryOption: 'Y',
      queryColumnDesc: null,
      paerrorCodege: null,
      errorDesc: null,
      errorCode: null
    };
  }
  public FnShowModel(key: string) {
    switch (key) {
      case 'showdata':
        this.HTMLkey = 'showdata';
        break;
      case 'updata':
        this.HTMLkey = 'updata';
        break;
      case 'comment':
        this.HTMLkey = 'comment';
        break;
      case 'degree':
        this.HTMLkey = 'degree';
        break;
      default:
    }
  }
  public FnEditModel(key?: string, typekey?: string, indx?: any, indy?: any): void {
    this.arrind = indx;
    this.typeind = indy;
    this.workKey = key;
    this.FninterfaceData();
    if (typekey !== 'code') {
      if (this.workKey === 'updata') {
        this.interfaceData = {
          argumentType: this.severData.paramList[indy].argumentType || null,
          queryColumnName: this.severData.paramList[indy].queryColumnName || null,
          queryColumnType: this.severData.paramList[indy].queryColumnType || 'String',
          queryOption: this.severData.paramList[indy].queryOption || 'Y',
          queryColumnDesc: this.severData.paramList[indy].queryColumnDesc || null,
          paerrorCodege: this.severData.paramList[indy].paerrorCodege || null
        };
      }
    } else {
      if (this.workKey === 'updata') {
        this.interfaceData = {
          errorDesc: this.severData.errorCodeList[indx].errorDesc || null,
          errorCode: this.severData.errorCodeList[indx].errorCode || null
        };
      }
    }
    switch (typekey) {
      case 'header':
        this.TYPEkey = 'header';
        break;
      case 'query':
        this.TYPEkey = 'querys';
        break;
      case 'body':
        this.TYPEkey = 'bodys';
        break;
      case 'code':
        this.TYPEkey = 'code';
        break;
      default:
    }
  }
  public FnSureEditModel() {
    let apiQueryId = null;
    let apiErrorCodeId = null;
    let obj = null;
    if (this.TYPEkey !== 'code') {
      apiQueryId = this.workKey === 'updata' ? this.severData.paramList[this.typeind].apiQueryId : null;
      obj = {
        apiQueryId,
        argumentType: this.TYPEkey,
        queryColumnName: this.interfaceData.queryColumnName,
        queryColumnType: this.interfaceData.queryColumnType,
        queryOption: this.interfaceData.queryOption,
        queryColumnDesc: this.interfaceData.queryColumnDesc
      };
    } else {
      apiErrorCodeId = this.workKey === 'updata' ? this.severData.errorCodeList[this.arrind].apiErrorCodeId : null;
      obj = {
        apiErrorCodeId,
        errorCode: this.interfaceData.errorCode,
        errorDesc: this.interfaceData.errorDesc
      };
    }
    switch (this.TYPEkey) {
      case 'header':
        if (this.workKey === 'add') {
          this.HeaderlData.push({ item: obj });
          this.severData.paramList.push(obj);
        } else if (this.workKey === 'updata') {
          this.HeaderlData[this.arrind] = obj;
          this.severData.paramList[this.typeind].item = obj;
        } else {
          this.HeaderlData.splice(this.arrind, 1);
          this.severData.paramList.splice(this.typeind, 1);
        }
        break;
      case 'querys':
        if (this.workKey === 'add') {
          this.queryData.push({ item: obj });
          this.severData.paramList.push(obj);
        } else if (this.workKey === 'updata') {
          this.queryData[this.arrind].item = obj;
          this.severData.paramList[this.typeind] = obj;
        } else {
          this.queryData.splice(this.arrind, 1);
          this.severData.paramList.splice(this.typeind, 1);
        }
        break;
      case 'bodys':
        if (this.workKey === 'add') {
          this.bodyData.push({ item: obj });
          this.severData.paramList.push(obj);
        } else if (this.workKey === 'updata') {
          this.bodyData[this.arrind].item = obj;
          this.severData.paramList[this.typeind] = obj;
        } else {
          this.bodyData.splice(this.arrind, 1);
          this.severData.paramList.splice(this.typeind, 1);
        }
        break;
      case 'code':
        if (this.workKey === 'add') {
          this.severData.errorCodeList.push(obj);
        } else if (this.workKey === 'updata') {
          this.severData.errorCodeList[this.arrind] = obj;
        } else {
          this.severData.errorCodeList.splice(this.arrind, 1);
        }
        break;
      default:
    }
  }

  public FnChangeModel(event: Event, key?: string): void {
    const nowEvent = event.target as HTMLSelectElement;
    const selectind = nowEvent.selectedIndex;
    switch (key) {
      case 'queryType':
        this.severData.queryType = nowEvent.options[selectind].value;
        break;
      case 'returnType':
        this.severData.returnType = nowEvent.options[selectind].value;
        break;
      case 'queryColumnType':
        this.interfaceData.queryColumnType = nowEvent.options[selectind].value;
        break;
      case 'YorN':
        this.interfaceData.queryOption = nowEvent.options[selectind].value;
        break;
      default:
    }
  }

  public FnSureSave(): void {
    this.Getdata('PUT', 'admin/api/updateApiInfo', this.severData);
  }
}
