import { Component } from '@angular/core';
import { IEmployee } from '../../models/iemployee';
import { EmployeeDataService } from '../../services/employee-data.service';
import { groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { UIEmployee } from '../../models/uiemployee';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  employees:UIEmployee[];

  constructor(public employeeService: EmployeeDataService) {}

  ngOnInit() {
      this.employeeService.getEmployees().subscribe((data:UIEmployee[])=>{
        this.employees=data
        console.log(data)
      },error=>{
        console.log("HTTP ERROR",error)
      },()=>{
          console.log("HTTP IS DONE")
      })    
  }
  
  isLessThan100Hours(employee: UIEmployee): boolean {
    return employee.timeHours < 100;
  }
}
