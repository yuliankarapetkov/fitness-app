import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth/auth.service';

@Component({
    selector: 'auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    error: string;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    async loginUser(event: FormGroup) {
        const { email, password } = event.value;

        try {
            await this.authService.loginUser(email, password);
            this.router.navigate(['/']);
        } catch (error) {
            this.error = error;
        }
    }
}