import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../modules/employee/models/employee.model';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }
    
    getEmployees() {
        return this.httpClient.get<Employee[]>('http://localhost:3000/employees');
    }
}