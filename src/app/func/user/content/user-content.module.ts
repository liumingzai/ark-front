import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PaginatorModule } from '../../../tool/paginator/paginator.module';
import { GraphListComponents } from './graphlist/graph-list.component';

import { UserContentComponents } from './main/user-content.component';
import { UserListComponents } from './list/user-list.component';
import { UserHeaderComponents } from './userheader/user-header.component';
import { SceneContentComponents } from './scene/sence-content.component';
import { AddUnitComponents } from './addunit/add-unit.component';

import { ArkPipeModule } from '../../../tool/pipe';

@NgModule({
  declarations: [
    UserContentComponents,
    UserListComponents,
    UserHeaderComponents,
    SceneContentComponents,
    AddUnitComponents,
    GraphListComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ArkPipeModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserContentComponents,
        children: [
          {
            path: 'add',
            component: AddUnitComponents
          },
          {
            path: 'updata',
            component: AddUnitComponents
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
