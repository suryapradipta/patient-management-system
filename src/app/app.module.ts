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
import {AuthInterceptor} from "./shared/services";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  DashboardComponent
} from './pages/administrator/dashboard/dashboard.component';
import {
  DesktopSidebarComponent
} from './pages/administrator/dashboard/desktop-sidebar/desktop-sidebar.component';
import {
  ManagePatientComponent
} from './pages/administrator/modules/manage-patient/manage-patient.component';
import {DataTablesModule} from "angular-datatables";
import { PatientDetailsComponent } from './pages/administrator/modules/manage-patient/patient-details/patient-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DesktopNavbarComponent,
    MobileNavbarComponent,
    LoginComponent,
    DashboardComponent,
    DesktopSidebarComponent,
    ManagePatientComponent,
    PatientDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
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
