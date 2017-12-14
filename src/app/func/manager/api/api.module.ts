import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { PaginatorModule } from '../../../tool/paginator';

import { ApiComponent } from './api.componet';
import { OverviewComponent } from './overview/overview.component';
import { SceneComponent } from './scene/scene.component';
import { WhitelistComponent } from './whitelist/whitelist.component';
import { ApiRecordComponent } from './api-record/api-record.component';
import { OverviewEditComponent } from './overview-edit/overview-edit.component';
import { OverviewDetailComponent } from './overview-detail/overview-detail.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ApiComponent,
    children: [
      { path: 'overview', component: OverviewComponent, data: { animation: 'overview' } },
      { path: 'overview/edit', component: OverviewEditComponent, data: { animation: 'overviewedit' } },
      { path: 'overview/detail/:id/:name', component: OverviewDetailComponent, data: { animation: 'overviewdetail' } },
      { path: 'scene', component: SceneComponent, data: { animation: 'scene' } },
      { path: 'whitelist', component: WhitelistComponent, data: { animation: 'whitelist' } },
      { path: 'apirecord', component: ApiRecordComponent, data: { animation: 'apirecord' } },
      { path: '', redirectTo: '/404' }
    ]
  }
];

@NgModule({
  declarations: [
    ApiComponent,
    OverviewComponent,
    SceneComponent,
    WhitelistComponent,
    ApiRecordComponent,
    OverviewEditComponent,
    OverviewDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PaginatorModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: []
})
export class ApiModule {}
