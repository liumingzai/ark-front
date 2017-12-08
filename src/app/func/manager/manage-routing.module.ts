import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageComponent } from './manage.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ManageComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'account', loadChildren: './account/account.module#AccountModule' },
          { path: 'api', loadChildren: './api/api.module#ApiModule' },
          { path: 'info', loadChildren: './info/info.module#InfoModule' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ManageRoutingModule {}
