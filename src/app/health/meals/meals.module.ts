import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MealsComponent } from './meals.component';

export const ROUTES: Routes = [
    { path: '', component: MealsComponent }
];

@NgModule({
    declarations: [
        MealsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ]
})
export class MealsModule { }
