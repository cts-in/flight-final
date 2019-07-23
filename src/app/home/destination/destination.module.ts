import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationComponent } from './destination.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { DestinationRoutes } from './destination.routes';
import { DestinationService } from './destination.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DestinationComponent],
  providers:[ DestinationService ],
  imports: [
    RouterModule.forChild(DestinationRoutes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ComponentsModule
  ]
})
export class DestinationModule { }
