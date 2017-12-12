import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatMenuModule, MatButtonModule } from '@angular/material';

import { ArkPipeModule } from '../../tool/pipe';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatToolbarModule, MatMenuModule, MatButtonModule, RouterModule, ArkPipeModule],
  exports: [HeaderComponent],
  providers: []
})
export class HeaderModule {}
