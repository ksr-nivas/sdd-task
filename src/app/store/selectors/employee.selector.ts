import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EmployeeState } from '../reducers/employee.reducer'

export const employeeState = createFeatureSelector<EmployeeState>('employees')

export const getAllEmployees = createSelector(
  employeeState,
  (state: EmployeeState) => state.employees
)
