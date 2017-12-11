import { Routes } from '@angular/router';

import { UserComponent } from './main/user.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'usercontrol',
        loadChildren: './content/user-content.module#ContentModule'
      },
      {
        path: 'authoritycontrol',
        loadChildren: './content/user-content.module#ContentModule'
      },
      {
        path: 'rolecontrol',
        loadChildren: './content/user-content.module#ContentModule'
      },
      {
        path: 'roleauthoritycontrol',
        loadChildren: './content/user-content.module#ContentModule'
      },
      {
        path: 'scene',
        loadChildren: './content/user-content.module#ContentModule'
      },
      {
        path: 'interface',
        loadChildren: './content/user-content.module#ContentModule'
      }
    ]
  }
];
