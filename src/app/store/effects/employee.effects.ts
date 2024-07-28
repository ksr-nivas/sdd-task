import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'
import * as EmployeeActions from '../actions/employee.actions'
import { EmployeeService } from '../../modules/employee/services/employee.service'

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

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      mergeMap(action =>
        this.employeeService.addEmployee(action.employee).pipe(
          map(employee => EmployeeActions.addEmployeeSuccess({ employee })),
          catchError(error => of(EmployeeActions.addEmployeeFailure({ error })))
        )
      )
    )
  )

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      mergeMap(action =>
        this.employeeService.updateEmployee(action.employee).pipe(
          map(employee => EmployeeActions.updateEmployeeSuccess({ employee })),
          catchError(error => of(EmployeeActions.updateEmployeeFailure({ error })))
        )
      )
    )
  )

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      switchMap(action =>
        this.employeeService.deleteEmployee(action.id).pipe(
          map((id) => EmployeeActions.deleteEmployeeSuccess({ id: action.id })),
          catchError(error => of(EmployeeActions.deleteEmployeeFailure({ error })))
        )
      )
    )
  )

  getEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.getEmployee),
      switchMap(action =>
        this.employeeService.getEmployee(action.id).pipe(
          map((employee) => EmployeeActions.getEmployeeSuccess({ employee })),
          catchError(error => of(EmployeeActions.getEmployeeFailure({ error })))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}
