import { Injector, NgModule } from '@angular/core';
import { BrowserModule, createApplication } from '@angular/platform-browser';
import { provideRouter, Router, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { HelloComponent } from './hello/hello.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgZone } from '@angular/core';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  // bootstrap: [AppComponent],
})
export class AppModule {
  // navigateToRemote(){
  //   this.ngZone.run(() => {
  //     this.router.navigate(['/remote']);
  //   });
  // }

  async webComponentApp() {
    this.ngZone.runOutsideAngular(async () => {
      // ✅ Run outside Angular Zone
      const app = await createApplication({
        providers: [
          provideRouter([
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
          ]),
        ],
      });

      const element = createCustomElement(AppComponent, {
        injector: app.injector,
      });
      customElements.define('my-app-webcomponent', element);
    });
  }

  constructor(
    private router: Router,
    private injector: Injector,
    private ngZone: NgZone
  ) {}

  async ngDoBootstrap() {
    await this.webComponentApp();
  }
}
