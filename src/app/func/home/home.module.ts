import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '../header/header.module';
import { HomeComponent } from './home.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: []
})
export class HomeModule { }