import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { Store } from '../store';

// features
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES),
        AuthModule,
        HealthModule,
        SharedModule
    ],
    providers: [
        Store
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
