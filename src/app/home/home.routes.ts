import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../home/carrier/carrier.module').then(
            m => m.CarrierModule
          )
      },
      {
        path: 'origin',

        loadChildren: () =>
          import('../home/origin/origin.module').then(m => m.OriginModule)
      },
      {
        path: 'destination',

        loadChildren: () =>
          import('../home/destination/destination.module').then(m => m.DestinationModule)
      },
      {
        path: 'pricerange',

        loadChildren: () =>
        import('../home/pricerange/pricerange.module').then(m => m.PricerangeModule)
      }
    ]
  }
];
