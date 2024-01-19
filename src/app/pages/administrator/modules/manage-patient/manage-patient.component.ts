import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {
  NotificationService,
  PatientService
} from "../../../../shared/services";
import {Patient} from "../../../../shared/models/patient.model";
import {Subject} from 'rxjs';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.css']
})
export class ManagePatientComponent implements OnInit, AfterViewInit, OnDestroy {
  patients: Patient[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private patientService: PatientService,
              private router: Router,
              private alert: NotificationService,) {
  }


  ngOnInit(): void {


    this.getPatients();
  }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: true,
      responsive: true,
    };
    // @ts-ignore
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
      // @ts-ignore
      this.dtTrigger.next();
    });
  }

  deletePatient(id: string): void {
    Swal.fire({
      title: 'Are you sure you want to delete this patient?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Product have been successfully deleted.',
          'success'
        );
        this.patientService.deletePatient(id).subscribe(() => {
            this.dtTrigger.unsubscribe();
            this.getPatients();
          },
          (error) => {
            if (error.status === 404) {
              this.alert.showErrorMessage('Patient not found');
            } else {
              this.alert.showErrorMessage(
                error.error?.message || 'Failed to delete patient'
              );
            }
          }
        );
      }
    });
  }

  addPatient() {
    this.router.navigate(['administrator/patients/add']);
  }

  editPatient(patient: Patient) {
    this.router.navigate(['administrator/patients/edit', patient._id]);
  }
}
