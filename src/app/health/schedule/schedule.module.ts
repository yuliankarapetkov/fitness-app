import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ScheduleComponent } from './schedule.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ControlsComponent } from './calendar/controls/controls.component';
import { DaysComponent } from './calendar/days/days.component';
import { SectionComponent } from './calendar/section/section.component';
import { SharedModule } from '../shared/shared.module';
import { AssignComponent } from './assign/assign.component';


export const ROUTES: Routes = [
    { path: '', component: ScheduleComponent }
];

@NgModule({
    declarations: [
        ScheduleComponent,
        CalendarComponent,
        ControlsComponent,
        DaysComponent,
        SectionComponent,
        AssignComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ]
})
export class ScheduleModule { }
