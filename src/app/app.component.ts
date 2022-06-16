import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees!: Employee[];
  public editEmployee: Employee | undefined;
  public deleteEmployee!: Employee;


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

 public  onAddEmployee(addForm: NgForm): void{
 this.employeeService.updateEmployees(addForm.value).subscribe(
    (response: Employee)=>{
      console.log(response);
      this.getEmployees();
      addForm.reset();
    },
    (error: HttpErrorResponse)=>{
      alert(error.message);
      addForm.reset();
    });
  }

  public  onDeleteEmployee(employeeId: any): void{
    this.employeeService.deleteEmployees(employeeId).subscribe(
      (response: void)=>{
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      });
    }

    public  onUpdateEmployee(employee: Employee): void{
      document.getElementById('add-employee-form')?.click();
      this.employeeService.addEmployees(employee).subscribe(
        (response: Employee)=>{
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        });
      }

      public searchEmployees(key: string): void{
        console.log(key);
        const result: Employee[] = [];
        for(const employee of this.employees){
          if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
            result.push(employee);
          }
        }
        this.employees = result;
        if(result.length === 0 || !key){
          this.getEmployees();
        }
      }

  public onOpenModal(employee: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.append(button);  
    button.click();
  }

}
