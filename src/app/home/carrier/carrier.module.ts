import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrierComponent } from './carrier.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { CarrierRoutes } from './carrier.routes';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CarrierService } from './carrier.service';

@NgModule({
  declarations: [CarrierComponent],
  providers:[ CarrierService ],
  imports: [
    RouterModule.forChild(CarrierRoutes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ComponentsModule
  ]
})
export class CarrierModule { }
