import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricerangeComponent } from './pricerange.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { PricerangeRoutes } from './pricerange.routes';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PricerangeService } from './pricerange.service';

@NgModule({
  declarations: [PricerangeComponent],
  providers:[ PricerangeService ],
  imports: [
    RouterModule.forChild(PricerangeRoutes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ComponentsModule
  ]
})
export class PricerangeModule { }
