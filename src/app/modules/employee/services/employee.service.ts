import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    constructor(private http: HttpClient) { }
    
    getEmployees() {
        return this.http.get<Employee[]>('http://localhost:3000/employees');
    }

    addEmployee(request: Employee) {
        return this.http.post('http://localhost:3000/employees/', request);
    }

    updateEmployee(request: Employee) {
        return this.http.put(`http://localhost:3000/employees/${request.id}`, request);
    }

    deleteEmployee(id: number) {
        return this.http.delete(`http://localhost:3000/employees/${id}`);
    }

    getEmployee(id: number) {
        return this.http.get<Employee>(`http://localhost:3000/employees/${id}`);
    }
}