import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  API_URL = 'http://localhost:3900/api/employees'
  employees: Employee[];

  constructor(private http: HttpClient) { 
    this.selectedEmployee = new Employee();
  }
  
  getEmployees() {
    return this.http.get(this.API_URL);
  }

  postEmployee(Employee: Employee) {
    return this.http.post(this.API_URL, Employee);
  }

  putEmployee(Employee: Employee) {
    return this.http.put(this.API_URL + `/${Employee._id}`, Employee)
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.API_URL + `/${_id}`)
  }
}
