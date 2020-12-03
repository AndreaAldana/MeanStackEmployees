import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../../services/employee.service'

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }


  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm) {

    console.log(form.value)
    if(!form.value.name || !form.value.position || !form.value.office || !form.value.salary){
      M.toast({html: "You need to fill out every field"});
      return;
    }

    if(form.value._id){
      this.employeeService.putEmployee(form.value).subscribe(res=> {
        console.log(res);
        M.toast({html: 'Employee updated'});
        this.getEmployees();
        form.reset();
      })
    } else (
      this.employeeService.postEmployee(form.value).subscribe(res => {
        M.toast({html: 'Employee saved'});
        this.getEmployees();
        form.reset()
    }))  
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employeeService.employees = res as Employee[];
      console.log(res);
    })
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
    this.employeeService.putEmployee(employee)
  }

  deleteEmployee(_id: string) {
    if(confirm('Are u sure u want to delete this?')){
      this.employeeService.deleteEmployee(_id).subscribe(res =>{
        console.log(res);
        M.toast({html: 'Employee was deleted'})
        this.getEmployees();
      })
    } 
  }

  resetForm(form?: NgForm) {
    if(form) {
      form.reset();
      
    }
  }

}
