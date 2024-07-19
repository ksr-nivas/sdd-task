import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as EmployeeActions from '../actions/employee.actions'
import { EmployeeService } from '../../shared/services/employee.service'

@Injectable()
export class EmployeeEffects {
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      mergeMap(() =>
        this.employeeService.getEmployees().pipe(
          map(employees => EmployeeActions.loadEmployeesSuccess({ employees })),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ error })))
        )
      )
    )
  )

//   addEmployee$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(EmployeeActions.addEmployee),
//       mergeMap(action =>
//         this.employeeService.addEmployee(action.employee).pipe(
//           map(employee => EmployeeActions.addEmployeeSuccess({ employee })),
//           catchError(error => of(EmployeeActions.addEmployeeFailure({ error })))
//         )
//       )
//     )
//   )

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}
