import { Component } from '@angular/core';
import { ApexAnnotations } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries } from 'ng-apexcharts/public_api';
import { Observable } from 'rxjs';
import { IEmployee } from '../models/iemployee';
import { UIEmployee } from '../models/uiemployee';
import { EmployeeDataService } from '../services/employee-data.service';
import { groupBy, map, mergeMap, toArray } from 'rxjs/operators';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
chartSeries:ApexNonAxisChartSeries=[];
 ChartDetails:ApexChart={
  type:'pie',
  toolbar:{
    show:true
  }

 }
 chartLabls=[];
 
 employees:UIEmployee[];
 constructor(public employeeService: EmployeeDataService) {}

 ngOnInit() {
  this.getEmployees();
 }

 getEmployees(): void {
  this.employeeService.getEmployees().subscribe(data=>{
    this.employees=data;
    this.employees.forEach(employee=>{
      if(employee.EmployeeName!=null){
                    this.chartSeries.push(employee.timeHours);
                    this.chartLabls.push(employee.EmployeeName);
                  }
    })
  console.log("Pie",this.employees)
})
 }

}
