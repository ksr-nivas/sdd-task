import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../models/employee.model';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'sdd-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf, NgClass
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('form') form!: NgForm;
  @Input()  employee: Employee | undefined;
  @Output() close: EventEmitter<string> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  employeeForm: FormGroup = new FormGroup({});
  buttonLabel: 'Add' | 'Update' = 'Add';
  submitted: boolean = false;

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      phone: new FormControl('', [Validators.required])
    });
    this.form?.resetForm();
    this.employeeForm.reset();
    if(this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      const value = changes['employee']?.currentValue;
      if(value) {
        this.employeeForm.patchValue(value);
        this.buttonLabel = 'Update';
      } else {
        this.form?.resetForm();
        this.employeeForm.reset();
        this.buttonLabel = 'Add';
        this.submitted = false;
      }
  }

  addOrUpdateEmployee() {
    const formValue = this.employeeForm.value;
    if(this.buttonLabel === 'Add')
      this.add.emit(formValue);
    else
      this.update.emit({...formValue, id: this.employee?.id});

    this.submitted = true;
    this.form?.resetForm();
    this.employeeForm.reset();
  }

  cancel() {
    this.form?.resetForm();
    this.employeeForm.reset();
    this.close.emit('close');
  }

  ngOnDestroy(): void {
      this.cancel();
  }
}
