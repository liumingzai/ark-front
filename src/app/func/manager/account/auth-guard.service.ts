import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Account } from '../../../account.model';

@Injectable()
export class AuthGuard implements CanActivate {
  private account: Account;
  constructor(private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = state.url;
    this.account = JSON.parse(localStorage.getItem('account'));

    if (this.account) {
      if (this.account.userType === 1) {
        // only researcher or admin can success
        return true;
      } else {
        // not researcher & admin, redirect to home
        this.router.navigate(['/404']);
      }
    } else {
      // not login, redirect to login
      this.router.navigate(['/login']);
    }
    return false;
  }
}
