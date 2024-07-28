import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: jasmine.SpyObj<Store<any>>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store<any>>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required fields', () => {
    expect(component.loginForm).toBeInstanceOf(FormGroup);
    expect(component.loginForm.get('userName')?.validator).toBe(Validators.required);
    expect(component.loginForm.get('password')?.validator).toBe(Validators.required);
  });

  it('should navigate to employee page on successful login', () => {
    const users = [{ username: 'test', password: 'test' }];
    store.select.and.returnValue(of(users));

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['/employee']);
    expect(snackBar.open).not.toHaveBeenCalled();
  });

  it('should navigate to login page on failed login', () => {
    store.select.and.returnValue(of(null));
    store.select.and.returnValue(of(null));
    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(snackBar.open).toHaveBeenCalledWith('Invalid username or password', '', { duration: 5000 });
  });
});
