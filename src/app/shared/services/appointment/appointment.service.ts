import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/v1/appointments';

  constructor(private http: HttpClient) {}

  scheduleAppointment(appointmentData: any): Observable<any> {
    const patientId = appointmentData.patientId;
    return this.http.post<any>(`${this.apiUrl}/${patientId}`, appointmentData);
  }

  getAppointmentsByPatient(patientId: string): Observable<Appointment[]> {
    const url = `${this.apiUrl}/${patientId}`;
    return this.http.get<Appointment[]>(url);
  }

  cancelAppointment(appointmentId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${appointmentId}`, {
      status: 'Cancelled',
    });
  }

  getAppointmentsReport(): Observable<Appointment[]> {
    const url = `${this.apiUrl}/report/all`;
    return this.http.get<Appointment[]>(url);
  }
}
