export interface Patient {
  _id: string;
  patientId: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  contactInfo: string;
  createdAt?: string;
  updatedAt?: string;
}
