import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkoutsComponent } from './workouts.component';

export const ROUTES: Routes = [
    { path: '', component: WorkoutsComponent }
];

@NgModule({
    declarations: [
        WorkoutsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ]
})
export class WorkoutsModule { }
