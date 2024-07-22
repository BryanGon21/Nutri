import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [

  ],
  imports:[
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es'
  }),
  WebsiteRoutingModule,
  RouterModule
  ]
})
export class WebsiteModule { }
