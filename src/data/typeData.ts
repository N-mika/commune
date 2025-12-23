interface USER {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee" | "user" | 'Maire';
}
