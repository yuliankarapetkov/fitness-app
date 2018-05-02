import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../store';
import { AuthService, User } from './auth/shared/services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    user$: Observable<User>;

    private userSubscription: Subscription;

    constructor(
       private store: Store,
       private authService: AuthService
    ) {}

    ngOnInit() {
        this.userSubscription = this.authService.auth$.subscribe();
        this.user$ = this.store.select<User>('user');
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
