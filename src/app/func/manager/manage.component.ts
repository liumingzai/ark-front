import { Component } from '@angular/core';
import { Account } from '../../account.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ManageService } from './manage.service';

@Component({
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
  public isAdmin: boolean; // 判断是管理员还是研究员，确定显示相应的nav
  public account: Account;

  constructor(private router: Router, private titleService: Title, private manageService: ManageService) {
    this.account = JSON.parse(localStorage.getItem('account'));

    if (this.account && this.account.roles) {
      this.isAdmin = this.account.roles[0].name === 'admin';
    } else {
      this.router.navigate(['/']);
    }
  }

  public logout() {
    this.manageService.logout().subscribe((data: any) => {
      if ('2000' === data.code) {
        localStorage.removeItem('account');
        this.router.navigate(['/']);
      }
    });
  }
}
