import { createReducer, on } from '@ngrx/store'
import * as EmployeeActions from '../actions/employee.actions'
import { Employee } from '../../modules/employee/models/employee.model'

export interface EmployeeState {
  employees: Employee[]
  selectedEmployee: Employee | null
  loading: boolean
  error: string | null
}

export const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null
}

export const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployees, state => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
    error: null
  })),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
//   on(EmployeeActions.selectEmployee, (state, { employee }) => ({
//     ...state,
//     selectedEmployee: employee
//   })),
  on(EmployeeActions.addEmployee, state => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    loading: false,
    error: null
  })),
  on(EmployeeActions.addEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(EmployeeActions.updateEmployee, state => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map(emp => emp.id === employee.id ? employee : emp),
    selectedEmployee: employee,
    loading: false,
    error: null
  })),
  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(EmployeeActions.deleteEmployee, state => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter(emp => emp.id !== id),
    selectedEmployee: null,
    loading: false,
    error: null
  })),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
)
