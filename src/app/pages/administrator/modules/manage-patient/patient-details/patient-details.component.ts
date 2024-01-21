import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Appointment, Patient } from '../../../../../shared/models';
import { ActivatedRoute } from '@angular/router';
import {
  AppointmentService,
  NotificationService,
  PatientService,
} from '../../../../../shared/services';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  patient: Patient;
  showReviewForm = false;
  newAppointment: any = {};
  appointments: Appointment[] = [];

  dtOptionsAppointment: DataTables.Settings = {};
  dtTriggerAppointment: Subject<any> = new Subject();

  dtOptionsHistory: DataTables.Settings = {};
  dtTriggerHistory: Subject<any> = new Subject();

  showAppointment = true;
  showHistory = false;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private alert: NotificationService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');

    if (patientId) {
      this.getAppointmentsByPatient(patientId);

      this.patientService.getPatient(patientId).subscribe(
        (patient: Patient) => {
          this.patient = {
            ...patient,
            dateOfBirth: new Date(patient.dateOfBirth)
              .toISOString()
              .split('T')[0],
          };
          console.log(this.patient);
        },
        (error) => {
          console.error('Error fetching patient:', error);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    this.dtOptionsAppointment = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: true,
      responsive: true,
    };

    this.dtOptionsHistory = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: true,
      responsive: true,
    };

    // @ts-ignore
    this.dtTriggerAppointment.next();
    // @ts-ignore
    this.dtTriggerHistory.next();
  }

  ngOnDestroy(): void {
    this.dtTriggerAppointment.unsubscribe();
    this.dtTriggerHistory.unsubscribe();
  }

  openReviewForm(): void {
    this.showReviewForm = true;
  }

  closeReviewForm(): void {
    this.showReviewForm = false;
  }

  showAppointmentTable(): void {
    this.showAppointment = true;
    this.showHistory = false;

    this.getAppointmentsByPatient(this.patient._id);
  }

  showHistoryTable(): void {
    this.showAppointment = false;
    this.showHistory = true;

    this.getAppointmentsByPatient(this.patient._id);
  }

  scheduleAppointment(form: NgForm): void {
    if (form.invalid) {
      this.alert.showErrorMessage(
        'Appointment data invalid. Please check your information.'
      );
      return;
    }

    if (this.patient._id) {
      this.newAppointment.patientId = this.patient._id;

      this.appointmentService
        .scheduleAppointment(this.newAppointment)
        .subscribe((response) => {
          this.alert.showSuccessMessage(response.message);
          this.closeReviewForm();
          this.dtTriggerAppointment.unsubscribe();
          this.dtTriggerHistory.unsubscribe();
          this.getAppointmentsByPatient(this.patient._id);
        });
    }
  }

  getAppointmentsByPatient(patientId: string): void {
    this.appointmentService
      .getAppointmentsByPatient(patientId)
      .subscribe((data: Appointment[]) => {
        this.appointments = data;

        // @ts-ignore
        this.dtTriggerHistory.next();
        // @ts-ignore
        this.dtTriggerAppointment.next();
      },
        (error) => {
          console.error('Error fetching appointments:', error);
        });
  }

  cancelAppointment(appointmentId: string): void {
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
          'Cancelled!',
          'Appointment have been successfully cancelled.',
          'success'
        );
        this.appointmentService.cancelAppointment(appointmentId).subscribe(
          () => {
            this.dtTriggerAppointment.unsubscribe();
            this.dtTriggerHistory.unsubscribe();
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
