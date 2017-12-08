import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {path: '', loadChildren: './func/home/home.module#HomeModule', pathMatch: 'full'},
  {path: 'login', loadChildren: './func/login/login.module#LoginModule'},
  {path: 'manager', loadChildren: './func/manager/manage.module#ManageModule'},
  {path: '404', loadChildren: './func/page-not-found/page-not-found.module#PageNotFoundModule'},
  {path: '500', loadChildren: './func/server-error/server-error.module#ServerErrorModule'},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
