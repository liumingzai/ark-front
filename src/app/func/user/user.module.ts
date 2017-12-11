import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '../header/header.module';
import { UserSidebarComponent } from './sidebar/user-sidebar.component';
import { UserComponent } from './main/user.component';

import { UserRoutes } from './user.routes';
import { UserServer } from './service/user.service';
import { UserHttpServer } from './service/user-http.service';

@NgModule({
  declarations: [UserComponent, UserSidebarComponent],
  imports: [CommonModule, FormsModule, HeaderModule, RouterModule.forChild(UserRoutes)],
  providers: [UserServer, UserHttpServer]
})
export class UserModule {}
