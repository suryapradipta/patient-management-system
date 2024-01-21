import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/patient/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { DashboardComponent } from './pages/administrator/dashboard/dashboard.component';
import { ManagePatientComponent } from './pages/administrator/modules/manage-patient/manage-patient.component';
import { PatientDetailsComponent } from './pages/administrator/modules/manage-patient/patient-details/patient-details.component';
import { AddEditPatientComponent } from './pages/administrator/modules/manage-patient/add-edit-patient/add-edit-patient.component';
import { ReportsComponent } from './pages/administrator/modules/reports/reports.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'administrator',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'manage-patient', component: ManagePatientComponent },
      { path: 'patients/add', component: AddEditPatientComponent },
      { path: 'patients/edit/:id', component: AddEditPatientComponent },
      { path: 'patients/view/:id', component: PatientDetailsComponent },
      { path: 'reports', component: ReportsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
