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
        // @ts-ignore
        this.dtTrigger.next();
      },
      (error) => {
        console.error('Error fetching appointment report:', error);
      }
    );
  }
}
