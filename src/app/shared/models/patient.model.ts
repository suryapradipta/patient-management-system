export interface Patient {
  _id: string;
  name: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  contactInfo: string;
  createdAt?: string;
  updatedAt?: string;
}
