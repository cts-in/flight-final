import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OriginComponent } from './origin.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { OriginRoutes } from './origin.routes';

@NgModule({
  declarations: [OriginComponent],
  imports: [
    RouterModule.forChild(OriginRoutes),
    CommonModule,
    ComponentsModule
  ]
})
export class OriginModule { }
