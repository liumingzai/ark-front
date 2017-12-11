import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MainDetailComponents } from './main/main-detailcomponent';
import { HickyDetailComponents } from './interface/interface-detail.component';

@NgModule({
  declarations: [MainDetailComponents, HickyDetailComponents],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainDetailComponents
      },
      {
        path: 'interface',
        component: HickyDetailComponents
      }
    ])
  ],
  providers: []
})
export class DetailsModule {}
