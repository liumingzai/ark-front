import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from '../header';

import { ServerErrorComponent } from './server-error.componnet';

const ROUTES: Routes = [{ path: '', component: ServerErrorComponent }];

@NgModule({
  declarations: [ServerErrorComponent],
  imports: [CommonModule, HeaderModule, RouterModule.forChild(ROUTES)],
  exports: [ServerErrorComponent],
  providers: []
})
export class ServerErrorModule {}
