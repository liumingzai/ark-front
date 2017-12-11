import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatTooltipModule } from '@angular/material';

import { PaginatorModule } from '../../../tool/paginator';

import { ApiComponent } from './api.componet';
import { OverviewComponent } from './overview/overview.component';
import { StaticComponent } from './static/static.component';
import { SceneComponent } from './scene/scene.component';
import { WhiteListComponent } from './white-list/white-list.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ApiComponent,
    children: [
      { path: 'overview', component: OverviewComponent, data: { animation: 'overview' } },
      { path: 'static', component: StaticComponent, data: { animation: 'static' } },
      { path: 'scene', component: SceneComponent, data: { animation: 'scene' } },
      { path: 'white', component: WhiteListComponent, data: { animation: 'order' } },
      { path: '', redirectTo: '/404' }
    ]
  }
];

@NgModule({
  declarations: [ApiComponent, OverviewComponent, StaticComponent, SceneComponent, WhiteListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    PaginatorModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: []
})
export class ApiModule {}
