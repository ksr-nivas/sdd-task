import { Routes } from '@angular/router'
import { EmployeeListComponent } from './list/employee-list.component'
import { EmployeeDetailsComponent } from './details/employee-details.component'

export const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
//   {
//     path: 'new',
//     component: EmployeeFormComponent
//   },
  {
    path: ':id',
    component: EmployeeDetailsComponent
  },
//   {
//     path: ':id/edit',
//     component: EmployeeFormComponent
//   }
]
