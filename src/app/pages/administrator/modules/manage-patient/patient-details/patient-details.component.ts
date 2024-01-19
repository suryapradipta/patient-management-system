import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../../shared/models/patient.model";
import {ActivatedRoute, Router} from '@angular/router';
import {
  NotificationService,
  PatientService
} from "../../../../../shared/services";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient = {
    _id: null,
    address: "",
    contactInfo: "",
    dateOfBirth: undefined,
    gender: "",
    name: "",
    patientId: ""
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private alert: NotificationService,
  ) {
  }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');

    if (patientId) {
      this.patientService.getPatient(patientId).subscribe((patient) => {
          this.patient = {
            ...patient,
            // Format the date for display in the form
            dateOfBirth: new Date(patient.dateOfBirth).toISOString().split('T')[0],
          };
          console.log(this.patient);
        },
        (error) => {
          console.error('Error fetching patient:', error)
        });
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
      this.patientService.editPatient(this.patient._id, this.patient).subscribe(
        (response) => {
        this.router.navigate(['/administrator/manage-patient']).then(r =>
          this.alert.showSuccessMessage(response.message)
        );
      });
    } else {
      this.patientService.addPatient(this.patient).subscribe((response) => {
        this.router.navigate(['/administrator/manage-patient']).then(r =>
          this.alert.showSuccessMessage(response.message));
      });
    }
  }

}
