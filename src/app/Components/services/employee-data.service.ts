import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../models/iemployee';
import { catchError, map, Observable, share, shareReplay, throwError } from 'rxjs';
import { UIEmployee } from '../models/uiemployee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  //private baseUrl =environment.apiEndpoint;
  private baseUrl='https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';
  employees:UIEmployee[]=[];
  private data$: Observable<UIEmployee[]>;
  constructor(public http: HttpClient) { }

  getEmployees():Observable<UIEmployee[]>{
     // rxjs
     if(!this.data$){
      this.data$ = this.http.get<IEmployee[]>(this.baseUrl).pipe(
        catchError((error) => {
          console.log('An error occurred:', error);
          return throwError('Something went wrong');
        }),
        map((items:IEmployee[])=>{
        const result_items: { [name:string]: IEmployee [] } = {}
        items.forEach(item=>{
          const name = item.EmployeeName  as string
          if(result_items[name]){
            result_items[name].push(item)
          }else{
            result_items[name] = [item];
          }
        })
            for(let key in result_items){
                  const items = result_items[key]
                  // cons
                  let timeMiliSec = 0;
  
                  items.forEach(item=>{
                    const attendacePerDay = new Date(item.EndTimeUtc).getTime()  - new Date ( item.StarTimeUtc).getTime();
                    timeMiliSec += attendacePerDay; // 100

              })
  
              this.employees.push({
                EmployeeName: items[0].EmployeeName,
                timeHours: Math.round( timeMiliSec / (1000 * 60 *60))
              })
              this.employees.sort((a,b)=>b.timeHours-a.timeHours);

            }
           return this.employees;
          }),share()
      )//END OF pip FUNCTION
        
     }
     return this.data$;
   
  }
  
}
