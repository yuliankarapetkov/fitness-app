import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { MealsComponent } from './meals.component';
import { MealComponent } from './meal/meal.component';
import { MealFormComponent } from './meal/meal-form/meal-form.component';

export const ROUTES: Routes = [
    { path: '', component: MealsComponent },
    { path: 'new', component: MealComponent },
    { path: ':id', component: MealComponent }
];

@NgModule({
    declarations: [
        MealsComponent,
        MealComponent,
        MealFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ]
})
export class MealsModule { }
