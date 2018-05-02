import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../store';
import { AuthService, User } from './auth/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    user$: Observable<User>;

    private userSubscription: Subscription;

    constructor(
        private router: Router,
        private store: Store,
        private authService: AuthService
    ) {}

    async handleOnLogout() {
        await this.authService.logoutUser();
        this.router.navigate(['/auth/login']);
    }

    ngOnInit() {
        this.userSubscription = this.authService.auth$.subscribe();
        this.user$ = this.store.select<User>('user');
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
