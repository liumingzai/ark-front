import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatCheckboxModule } from '@angular/material';

import { BindRoleComponent } from './bind-role.component';

@NgModule({
  declarations: [BindRoleComponent],
  imports: [CommonModule, FormsModule, MatDialogModule, MatCheckboxModule],
  exports: [BindRoleComponent],
  entryComponents: [BindRoleComponent],
  providers: []
})
export class BindRoleModule {}
