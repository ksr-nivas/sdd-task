import { Routes } from '@angular/router'
import { EmployeeListComponent } from './list/employee-list.component'
import { EmployeeDetailsComponent } from './details/employee-details.component'
import { authGuard } from '../../guards/auth.guard'

export const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    canActivate: [authGuard]
  },
  {
    path: ':id',
    component: EmployeeDetailsComponent
  }
]
