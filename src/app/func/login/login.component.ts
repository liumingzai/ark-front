import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { wrapDatas, reqDatas, recDatas } from './model/home-type';
import { LoginService } from './service/login.service';
import { Account } from '../../account.model';
import * as $ from 'jquery';

@Component({
  selector: 'ark-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  @Input() public wrapDatas: wrapDatas;
  public reqDatas: reqDatas;
  public recDatas: recDatas;
  public GTdata: any;
  public loginData: any;
  public account: Account;
  constructor(private router: Router, private route: ActivatedRoute, private loginservice: LoginService) {
    this.GTdata = '';
    this.loginData = '';
  }
  public ngOnInit(): void {
    this.wrapDatas = {
      pdzhi: 'login',
      erjipdzhi: 'pwd-login',
      sanjipdzhi: 'YZ',
      rootkey: '',
      userInpVal: null,
      userPwdVal: null,
      userYZVal: null,
      userEmailVal: null,
      userAUTHVal: null
    };
    this.Getdata('GET', '/verify/checkGeeServer');
  }
  public Getdata(sertype: string, serurl: string, dataParam?: any, isForm?: boolean): void {
    this.loginservice.FnHomes(sertype, serurl, dataParam, isForm).subscribe((data: any) => {
      if ('2000' === data.code) {
        console.warn(this.wrapDatas.sanjipdzhi);
        if (this.wrapDatas.sanjipdzhi === 'YZ') {
          this.GTdata = data.data;
          this.FnGT(JSON.parse(this.GTdata));
        }
        if (this.wrapDatas.sanjipdzhi === 'login') {
          this.loginData = data.data;
          localStorage.setItem('account', JSON.stringify(this.loginData));
          this.router.navigate(['']);
        }
        this.FnSwitchMondule('pwd-login');
      }
    });
  }
  public HttpGetdata(sertype: string, serurl: string, dataParam?: any, isForm?: boolean): void {
    this.loginservice.FnHomes(sertype, serurl, dataParam).subscribe((data: any) => {
      if ('2000' === data.code) {
        if (this.wrapDatas.sanjipdzhi === 'YZ') {
          this.GTdata = data.data;
          this.FnGT(JSON.parse(this.GTdata));
        }
        if (this.wrapDatas.sanjipdzhi === 'login') {
          this.loginData = data.data;
        }
      }
    });
  }
  public FnSwitchMondule(key: string): void {
    switch (key) {
      case 'pwd-login':
        this.wrapDatas.pdzhi = 'login';
        this.wrapDatas.erjipdzhi = 'pwd-login';
        break;
      case 'duanxin-login':
        this.wrapDatas.pdzhi = 'login';
        this.wrapDatas.erjipdzhi = 'duanxin-login';
        break;
      case 'register':
        this.wrapDatas.pdzhi = 'register';
        this.wrapDatas.erjipdzhi = 'register';
        break;
      case 'forget-pwd':
        this.wrapDatas.pdzhi = 'resetPwd';
        this.wrapDatas.erjipdzhi = 'forget-pwd';
        break;
      default:
    }
  }
  public FnGT(data: any): void {
    const captcha = document.querySelector('.member-captcha') as HTMLDivElement;
    const wait = document.querySelector('.member-wait') as HTMLDivElement;
    this.wrapDatas.sanjipdzhi = 'YZ';
    window['initGeetest'](
      {
        gt: data.gt,
        challenge: data.challenge,
        offline: !data.success,
        new_captcha: data.new_captcha,
        product: 'float',
        width: '90%'
      },
      (captchaObj: any) => {
        captchaObj.appendTo(captcha);
        captchaObj.onReady(() => {
          wait.classList.add('hide');
        });

        captchaObj.onSuccess(() => {
          this.Getdata('GET', '/verify/verifyLogin', {
            geeServerStatus: 1,
            verifyType: 'register'
          });
        });

        captchaObj.onError(() => {
          console.warn('There has an geetest error');
        });
      }
    );
  }

  public fnYZ(key: string): void {
    const userInp = document.querySelector('.user-inp') as HTMLFormElement;
    if (key === 'login') {
      this.wrapDatas.rootkey = '/account/getLoginAuthCode';
    } else {
      this.wrapDatas.rootkey = '/account/getRegisterAuthCode';
    }
    this.HttpGetdata('GET', this.wrapDatas.rootkey, {
      phone: this.wrapDatas.userInpVal
    });
  }

  public FnYZAccount(key: string): void {
    if (key === 'phone') {
      this.HttpGetdata('GET', '/account/getCheckPhone', {
        phone: this.wrapDatas.userInpVal
      });
    } else if (key === 'email') {
      this.HttpGetdata('GET', '/account/getCheckEmail', {
        email: this.wrapDatas.userEmailVal
      });
    }
  }

  public FnReg(): void {
    this.Getdata(
      'POST',
      '/account/register',
      {
        phone: this.wrapDatas.userInpVal,
        email: this.wrapDatas.userEmailVal,
        password: window.btoa(this.wrapDatas.userPwdVal),
        verifyCode: this.wrapDatas.userYZVal
      },
      true
    );
  }
  public FnLogin(): void {
    this.wrapDatas.sanjipdzhi = 'login';
    let option = {} as object;

    if (this.wrapDatas.erjipdzhi === 'pwd-login') {
      this.wrapDatas.rootkey = '/account/loginByPassword';
      option = {
        authentication: this.wrapDatas.userAUTHVal,
        password: window.btoa(this.wrapDatas.userPwdVal)
      };
    } else {
      this.wrapDatas.rootkey = '/account/loginByAuthCode';
      option = {
        phone: this.wrapDatas.userAUTHVal,
        authCode: this.wrapDatas.userYZVal
      };
    }
    this.Getdata('POST', this.wrapDatas.rootkey, option, true);
  }
}
