export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee" | "user" | 'Maire';
}
export interface BirthCerticat {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  fokontany: string;
  dateOfBirth: string;
  registrationNumber: string;
  requestDate: string;
  status: string;
  createdAt: string;
  genre: 'M' | 'F';
}
