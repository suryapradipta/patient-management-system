import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/patient/home/home.component';
import {
  DesktopNavbarComponent
} from './pages/patient/home/desktop-navbar/desktop-navbar.component';
import {
  MobileNavbarComponent
} from './pages/patient/home/mobile-navbar/mobile-navbar.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {AuthInterceptor} from "./shared/services/auth/auth-interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './pages/administrator/dashboard/dashboard.component';
import { DesktopSidebarComponent } from './pages/administrator/dashboard/desktop-sidebar/desktop-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DesktopNavbarComponent,
    MobileNavbarComponent,
    LoginComponent,
    DashboardComponent,
    DesktopSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
