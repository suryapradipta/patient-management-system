import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NotificationService,
  PatientService,
} from '../../../../../shared/services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.css'],
})
export class AddEditPatientComponent implements OnInit {
  patient: Patient = {
    _id: null,
    address: '',
    contactInfo: '',
    dateOfBirth: undefined,
    gender: '',
    name: '',
    patientId: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private alert: NotificationService
  ) {}

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');

    if (patientId) {
      this.patientService.getPatient(patientId).subscribe(
        (patient: Patient) => {
          this.patient = {
            ...patient,
            // Format the date for display in the form
            dateOfBirth: new Date(patient.dateOfBirth)
              .toISOString()
              .split('T')[0],
          };
        },
        (error) => {
          console.error('Error fetching patient:', error);
        }
      );
    }
  }

  savePatient(form: NgForm) {
    if (form.invalid) {
      this.alert.showErrorMessage(
        'Your patient data invalid. Please check your information.'
      );
      return;
    }

    if (this.patient._id) {
      this.patientService
        .editPatient(this.patient._id, this.patient)
        .subscribe((response) => {
          this.router
            .navigate(['/administrator/manage-patient'])
            .then((r) => this.alert.showSuccessMessage(response.message));
        },
          (error) => {
            console.error('Error editing patient:', error);

            if (error.status === 404) {
              this.alert.showErrorMessage(
                'Patient not found. Please refresh and try again.'
              );
            } else if (error.status === 400) {
              this.alert.showErrorMessage(
                error.error?.message ||
                'All fields are required. Please fill in all details.'
              );
            } else {
              this.alert.showErrorMessage(
                error.error?.message ||
                'Edit product failed. Please try again later.'
              );
            }
          });
    } else {
      this.patientService.addPatient(this.patient).subscribe((response) => {
        this.router
          .navigate(['/administrator/manage-patient'])
          .then((r) => this.alert.showSuccessMessage(response.message));
      },
        (error) => {
          console.error('Error adding patient:', error);

          if (error.status === 404) {
            this.alert.showErrorMessage(
              'Patient not found. Please refresh and try again.'
            );
          } else if (error.status === 400) {
            this.alert.showErrorMessage(
              error.error?.message ||
              'All fields are required. Please fill in all details.'
            );
          } else {
            this.alert.showErrorMessage(
              error.error?.message ||
              'Edit product failed. Please try again later.'
            );
          }
        });
    }
  }
}
