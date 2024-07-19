import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../modules/login/models/user.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private httpClient: HttpClient, private router: Router) { }
    
    login() {
        return this.httpClient.get<User[]>('http://localhost:3000/users');
    }

    logout() {
        this.router.navigate(['/login']);
    }
}