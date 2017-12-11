import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PaginatorModule } from '../../../tool/paginator/paginator.module';
import { GraphListComponent } from './graphlist/graph-list.component';

import { UserContentComponent } from './main/user-content.component';
import { UserListComponent } from './list/user-list.component';
import { UserHeaderComponent } from './userheader/user-header.component';
import { SceneContentComponent } from './scene/sence-content.component';
import { AddUnitComponent } from './addunit/add-unit.component';

import { ArkPipeModule } from '../../../tool/pipe';

@NgModule({
  declarations: [
    UserContentComponent,
    UserListComponent,
    UserHeaderComponent,
    SceneContentComponent,
    AddUnitComponent,
    GraphListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ArkPipeModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserContentComponent,
        children: [
          {
            path: 'add',
            component: AddUnitComponent
          },
          {
            path: 'updata',
            component: AddUnitComponent
          },
          {
            path: 'detail',
            loadChildren: '../details/user-details.module.ts#DetailsModule'
          }
        ]
      }
    ])
  ],
  providers: []
})
export class ContentModule {}
