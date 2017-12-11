import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MainDetailComponent } from './main/main-detailcomponent';
import { HickyDetailComponent } from './interface/interface-detail.component';

@NgModule({
  declarations: [MainDetailComponent, HickyDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainDetailComponent
      },
      {
        path: 'interface',
        component: HickyDetailComponent
      }
    ])
  ],
  providers: []
})
export class DetailsModule {}
