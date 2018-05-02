import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from './shared/shared.module';

export const firebaseConfig = {
    apiKey: 'AIzaSyAek70b8J7j6-W8Dm9zfUQy1xEtRdf2VcI',
    authDomain: 'fitness-app-f93dd.firebaseapp.com',
    databaseURL: 'https://fitness-app-f93dd.firebaseio.com',
    projectId: 'fitness-app-f93dd',
    storageBucket: 'fitness-app-f93dd.appspot.com',
    messagingSenderId: '383882926803'
};

export const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'register', loadChildren: './register/register.module#RegisterModule' }
        ]
    }
];

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(ROUTES),
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      SharedModule.forRoot()
  ]
})
export class AuthModule { }
