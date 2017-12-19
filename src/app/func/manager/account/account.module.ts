import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
} from '@angular/material';

import { PaginatorModule } from '../../../tool/paginator';

import { AccountComponent } from './account.component';
import { AuthComponent } from './auth/auth.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { AuthEditComponent } from './auth-edit/auth-edit.component';
import { BindRoleModule } from './user-edit/bind-role/bind-role.module';
import { AuthRoleComponent } from './auth-role/auth-role.component';
import { AuthGuard } from './auth-guard.service';

const ACCOUNTROUTES: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user', component: UserComponent, data: { animation: 'user' } },
      { path: 'user/edit', component: UserEditComponent, data: { animation: 'user_edit' } },
      { path: 'role', component: RoleComponent, data: { animation: 'role' } },
      { path: 'role/edit', component: RoleEditComponent, data: { animation: 'role_edit' } },
      { path: 'bind/auth', component: AuthRoleComponent, data: { animation: 'bind-auth' } },
      { path: 'auth', component: AuthComponent, data: { animation: 'auth' } },
      { path: 'auth/edit', component: AuthEditComponent, data: { animation: 'auth_edit' } },
      { path: '', redirectTo: '/404' }
    ]
  }
];

@NgModule({
  declarations: [
    AccountComponent,
    UserComponent,
    UserEditComponent,
    RoleComponent,
    RoleEditComponent,
    AuthComponent,
    AuthEditComponent,
    AuthRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    PaginatorModule,
    BindRoleModule,
    RouterModule.forChild(ACCOUNTROUTES)
  ],
  exports: [],
  providers: [AuthGuard]
})
export class AccountModule {}
