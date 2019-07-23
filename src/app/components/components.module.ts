import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NameComponent } from './name/name.component';

@NgModule({
  declarations: [NameComponent, LogoComponent],
  exports: [NameComponent, LogoComponent],
  imports: [CommonModule]
})
export class ComponentsModule {}
