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
 
      this.employeeService.getEmployees().subscribe(data=>{
        this.employees=data
        console.log(data)
      },error=>{
        console.log("HTTP ERROR",error)
      },()=>{
          console.log("HTTP IS DONE")
      })
      
  }
  // getEmployees(): void {
  //   this.employeeService.getEmployees().subscribe((data: IEmployee[]) => {
  //     // this.employees= data;
  //     // const employeess = data.reduce((acc, entry) => {
  //     //   if (acc[entry.EmployeeName]) {
  //     //     acc[entry.EmployeeName].push(entry);
  //     //   } else {
  //     //     acc[entry.EmployeeName] = [entry];
  //     //   }
  //     //   return acc;
  //     // }, {})

  //     const result_items: { [name:string]: IEmployee [] } = {}
     
  //     data.forEach(item=>{
  //       const name = item.EmployeeName  as string
  //       if(result_items[name]){
  //         result_items[name].push(item)
  //       }else{
  //         result_items[name] = [item];
  //       }
  //     })

  //      // {
  //      // 'karim' : [ob, ob2, ob3, ob4 ],
  //     // 'ali' : [ob, ob2],
  //     // 
  //      //}

  //      // []

       
  //     for(let key in result_items){
  //       const items = result_items[key]
  //       // cons
  //       let timeMiliSec = 0;

  //      items.forEach(item=>{
  //         const attendacePerDay = new Date(item.EndTimeUtc).getTime()  - new Date ( item.StarTimeUtc).getTime();
  //         timeMiliSec += attendacePerDay; // 100
         
        
  //       })

  //       this.employees.push({
  //         EmployeeName: items[0].EmployeeName,
  //         timeHours: Math.round( timeMiliSec / (1000 * 60 *60))
  //       })
  //       this.employees.sort((a,b)=>b.timeHours-a.timeHours);


  //     }


  //     // console.log(data);
  //   });
  // }
 
  isLessThan100Hours(employee: UIEmployee): boolean {
    return employee.timeHours < 100;
  }
}
