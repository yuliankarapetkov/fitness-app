import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Subscription } from 'rxjs/Subscription';

import { ScheduleItem, ScheduleService } from '../shared/services/schedule/schedule.service';
import { Store } from '../../../store';
import { Workout, WorkoutsService } from '../shared/services/workouts/workouts.service';
import { Meal, MealsService } from '../shared/services/meals/meals.service';

@Component({
    selector: 'health-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
    open: boolean = false;

    date$: Observable<Date>;
    schedule$: Observable<ScheduleItem[]>;
    selected$: Observable<any>;
    list$: Observable<Meal[] | Workout[]>;

    private subscriptions: Subscription[];

    constructor(
        private store: Store,
        private mealsService: MealsService,
        private workoutsService: WorkoutsService,
        private scheduleService: ScheduleService
    ) { }

    private closeAssignModal() {
        this.open = false;
    }

    handleOnChange(date: Date) {
        this.scheduleService.updateDate(date);
    }

    handleOnSelect(event: any) {
        this.open = true;
        this.scheduleService.selectSection(event);
    }

    handleOnAssignUpdate(items: string[]) {
        this.scheduleService.updateItems(items);
        this.closeAssignModal();
    }

    handleOnAssignCancel() {
        this.closeAssignModal();
    }

    ngOnInit() {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');
        this.selected$ = this.store.select('selected');
        this.list$ = this.store.select('list');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.list$.subscribe(),
            this.scheduleService.items$.subscribe(),
            this.mealsService.meals$.subscribe(),
            this.workoutsService.workouts$.subscribe()
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
