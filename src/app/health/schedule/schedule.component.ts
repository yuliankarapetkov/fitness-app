import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { Store } from '../../../store';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'health-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
    date$: Observable<Date>;

    private subscriptions: Subscription[];

    constructor(
        private store: Store,
        private scheduleService: ScheduleService
    ) { }

    handleOnChange(date: Date) {
        this.scheduleService.updateDate(date);
    }

    ngOnInit() {
        this.date$ = this.store.select('date');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe()
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
