export interface Employeeinterface {
    id?: string;              // Optional for new employees (auto-generated)
    name: string;
    email: string;
    contact: string;
    password?:string;
    department: string;
    dateOfJoining: Date | string;       // Date of Joining
    task: string[];          // Array of assigned tasks
    role?: 'employee' | 'admin' | 'custom'; // Optional role if needed
}
