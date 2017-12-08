import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { HeaderModule } from '../header';

import { PageNotFoundComponent } from './page-not-found.component';

const ROUTES: Routes = [{ path: '', component: PageNotFoundComponent }];

@NgModule({
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule.forChild(ROUTES), HeaderModule],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule {}