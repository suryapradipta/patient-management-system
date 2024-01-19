import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Appointment, Patient} from "../../../../../shared/models";
import {ActivatedRoute} from "@angular/router";
import {
  AppointmentService,
  NotificationService,
  PatientService
} from "../../../../../shared/services";
import {NgForm} from "@angular/forms";
import {Subject} from "rxjs";
import Swal from "sweetalert2";


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  patient: Patient;
  showReviewForm = false;
  newAppointment: any = {};
  appointments: Appointment[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private alert: NotificationService,
    private appointmentService: AppointmentService
  ) {
  }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');

    if (patientId) {
      this.getAppointmentsByPatient(patientId);


      this.patientService.getPatient(patientId).subscribe((patient: Patient) => {
          this.patient = {
            ...patient,
            dateOfBirth: new Date(patient.dateOfBirth).toISOString().split('T')[0],
          };
          console.log(this.patient);
        },
        (error) => {
          console.error('Error fetching patient:', error)
        });
    }
  }

  openReviewForm(): void {
    this.showReviewForm = true;
  }

  closeReviewForm(): void {
    this.showReviewForm = false;
  }

  scheduleAppointment(form: NgForm) {
    if (form.invalid) {
      this.alert.showErrorMessage(
        'Appointment data invalid. Please check your information.'
      );
      return;
    }

    if (this.patient._id) {
      this.newAppointment.patientId = this.patient._id;

      this.appointmentService.scheduleAppointment(this.newAppointment).subscribe((response) => {
        this.alert.showSuccessMessage(response.message);
        this.closeReviewForm();
        this.dtTrigger.unsubscribe();
        this.getAppointmentsByPatient(this.patient._id);
      });
    }
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

  getAppointmentsByPatient(patientId: string) {
    this.appointmentService.getAppointmentsByPatient(patientId).subscribe((data: Appointment[]) => {
      this.appointments = data;

      // @ts-ignore
      this.dtTrigger.next();
    });
  }

  cancelAppointment(appointmentId: string) {
    Swal.fire({
      title: 'Are you sure you want to cancel this appointment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Appointment have been successfully cancelled.',
          'success'
        );
        this.appointmentService.cancelAppointment(appointmentId).subscribe(() => {
          this.dtTrigger.unsubscribe();
          this.getAppointmentsByPatient(this.patient._id);

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
}
