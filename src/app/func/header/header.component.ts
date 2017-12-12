import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Account } from '../../account.model';
import { AppService } from '../../app.service';
import { HeaderService } from './header.service';

import { SnackBar } from '../../tool/snackbar';

@Component({
  selector: 'ark-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [HeaderService]
})
export class HeaderComponent {
  @Input() public arkTitle: string;
  public account: Account;

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: SnackBar,
    private appService: AppService
  ) {
    if (localStorage.getItem('account')) {
      this.account = JSON.parse(localStorage.getItem('account'));
    } else {
      this.account = new Account();
    }

    this.appService.accountAnnounced.subscribe((account: Account) => {
      console.warn(111);
      this.account = account;
    });
  }

  public onLogout() {
    this.headerService.logout().subscribe((data: any) => {
      if ('2000' === data.code) {
        localStorage.clear();
        this.account = new Account();
        this.snackbar.success('退出登录成功');
        this.router.navigate(['/']);
        // location.reload() ;
      }
    });
  }
}
