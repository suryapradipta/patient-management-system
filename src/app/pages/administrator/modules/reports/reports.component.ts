import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentService} from "../../../../shared/services";
import {Appointment} from "../../../../shared/models";
import {Subject} from "rxjs";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit, OnDestroy {
  appointments: Appointment[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
<<<<<<< HEAD
  fromDate: Date;
  toDate: Date;
  filteredAppointments: Appointment[] = [];
=======
>>>>>>> ecc12e735e65ac496e5bc0e3ff6dd51afe6675dc

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAppointmentReport();
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

  getAppointmentReport(): void {
    this.appointmentService.getAppointmentsReport().subscribe(
      (data: Appointment[]) => {
        this.appointments = data;
<<<<<<< HEAD
        this.filteredAppointments = [...this.appointments];
=======
>>>>>>> ecc12e735e65ac496e5bc0e3ff6dd51afe6675dc
        // @ts-ignore
        this.dtTrigger.next();
      },
      (error) => {
        console.error('Error fetching appointment report:', error);
      }
    );
  }
<<<<<<< HEAD

  filterAppointments(): void {

    if (this.fromDate && this.toDate) {
      console.log(this.appointments)
      this.filteredAppointments = this.appointments.filter(
        (appointment) =>
          new Date(appointment.date) >= new Date(this.fromDate) &&
          new Date(appointment.date) <= new Date(this.toDate)
      );
      console.log(this.filteredAppointments)
    } else {
      // If fromDate or toDate is not set, show all appointments
      this.filteredAppointments = [...this.appointments];
    }

  }
=======
>>>>>>> ecc12e735e65ac496e5bc0e3ff6dd51afe6675dc
}
