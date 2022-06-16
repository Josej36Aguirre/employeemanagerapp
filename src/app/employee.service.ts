import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http'
import { Employee } from './employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl= environment.apiBaseUrl;
  constructor(private http :HttpClient) { }

  public getEmployees(): Observable<Employee[]>{
    return this.http.get<any>(`${this.apiServerUrl}/employee/all`)
  }

  public addEmployees(employee: Employee): Observable<Employee>{
    return this.http.post<any>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployees(employee: Employee): Observable<Employee>{
    return this.http.put<any>(`${this.apiServerUrl}/employee/update`, employee)
  }

  public deleteEmployees(employeeId: any): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`)
  }
}
