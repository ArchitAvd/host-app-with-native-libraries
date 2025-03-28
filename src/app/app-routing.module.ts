import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

// const MFE_APP_URL = 'http://localhost:4201/remoteEntry.js';
export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'flight',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'flight',
        exposedModule: './FlightAppModule',
      }).then((m) => m.FlightAppModule),
  },
  {
    path: 'hotel',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'hotel',
        exposedModule: './HotelAppModule',
      }).then((m) => m.HotelAppModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
