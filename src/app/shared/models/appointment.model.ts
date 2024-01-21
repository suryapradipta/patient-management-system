import { Patient } from './patient.model';

export interface Appointment {
  _id: string;
  patientId: Patient;
  date: Date;
  status: 'Scheduled' | 'Cancelled';
}
