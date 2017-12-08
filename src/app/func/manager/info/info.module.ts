import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxCropperModule } from 'ngx-cropper';
import { ArkPipeModule } from '../../../tool/pipe';


import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
} from '@angular/material';

import { InfoComponent } from './info.component';

const ROUTES: Routes = [
  { path: '', component: InfoComponent, children: [] },
];

@NgModule({
  declarations: [
    InfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,  
    NgxCropperModule,
    ArkPipeModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: [],
})
export class InfoModule {}
