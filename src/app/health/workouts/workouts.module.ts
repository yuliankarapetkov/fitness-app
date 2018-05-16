import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { WorkoutsComponent } from './workouts.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutFormComponent } from './workout/workout-form/workout-form.component';
import { WorkoutTypeComponent } from './workout/workout-type/workout-type.component';

export const ROUTES: Routes = [
    { path: '', component: WorkoutsComponent },
    { path: 'new', component: WorkoutComponent },
    { path: ':id', component: WorkoutComponent }
];

@NgModule({
    declarations: [
        WorkoutsComponent,
        WorkoutComponent,
        WorkoutFormComponent,
        WorkoutTypeComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ]
})
export class WorkoutsModule { }
