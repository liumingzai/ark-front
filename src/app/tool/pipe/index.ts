import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgPathPrePipe } from './img-path-pre.pipe';
import { TrustHtmlPipe } from './trust-html.pipe';
import { TrustURLPipe } from './trust-url.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImgPathPrePipe,
    TrustHtmlPipe,
    TrustURLPipe
  ],
  exports: [
    ImgPathPrePipe,
    TrustHtmlPipe,
    TrustURLPipe
  ]
})
export class ArkPipeModule { }
