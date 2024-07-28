import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

    private loggedInUser!: User;

    constructor(private httpClient: HttpClient, private router: Router) { }

    setuser(user: User) {
        this.loggedInUser = user;
    }

    isLoggedInUser() {
        return !!this.loggedInUser;
    }
    
    login() {
        return this.httpClient.get<User[]>('http://localhost:3000/users');
    }

    logout() {
        this.router.navigate(['/login']);
    }
}