import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/patient/home/home.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import { AdminGuard } from './shared/guards/admin.guard';
import {
  DashboardComponent
} from "./pages/administrator/dashboard/dashboard.component";
import {
  ManagePatientComponent
} from "./pages/administrator/modules/manage-patient/manage-patient.component";
import {
  PatientDetailsComponent
} from "./pages/administrator/modules/manage-patient/patient-details/patient-details.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'administrator',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'manage-patient', component: ManagePatientComponent },
      { path: 'patients/add', component: PatientDetailsComponent },
      { path: 'patients/edit/:id', component: PatientDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
