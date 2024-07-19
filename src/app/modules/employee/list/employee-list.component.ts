import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../shared/services/employee.service';
import { Employee } from '../models/employee.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { EmployeeState } from '../../../store/reducers/employee.reducer';
import { getAllEmployees } from '../../../store/selectors/employee.selector';
import * as EmployeeActions from '../../../store/actions/employee.actions';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../../shared/components/delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSidenavModule,
    DeleteConfirmationComponent,
    EmployeeFormComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employeeService: EmployeeService = inject(EmployeeService);
  dialog: MatDialog = inject(MatDialog);
  readonly store = inject(Store<EmployeeState>);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  employees: Employee[] = [];
  displayedColumns: string[] = ['select', 'name', 'email', 'address', 'phone', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);
  selection = new SelectionModel<Employee>(true, []);

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());

    this.store.select(getAllEmployees).subscribe({
      next: (employees: Employee[]) => {
        if(!employees || !employees.length) {
          return;
        }
        this.employees = employees;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.dataSource.paginator = this.paginator;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addEmployee(formValue: any): void {
    console.log(formValue);
    // TODO
  }

  deleteEmployee(row?: any): void {
    if(!row && this.selection?.selected?.length === 0) {
      return;
    }
    if(row) {
      this.employees = this.employees.filter(emp => emp.id !== row.id);
    } else if(this.selection?.selected?.length > 0) {
      this.selection.selected.forEach(emp => {
        this.employees = this.employees.filter(employee => employee.id !== emp.id);
      });
    }
    this.selection.clear();
    this.dataSource = new MatTableDataSource<Employee>(this.employees);
    this.dataSource.paginator = this.paginator;
  }

  openDialog(row?: any) {
    const deleteDialog = this.dialog.open(DeleteConfirmationComponent);

    deleteDialog.afterClosed().pipe(take(1)).subscribe(result => {
      if(result) {
        this.deleteEmployee(row);
      } else if(result === false) {
        this._snackBar.open('Not authorized', 'Close', {
          duration: 5000
        });
      }
    });
  }
}
