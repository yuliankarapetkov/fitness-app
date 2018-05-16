import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';

import { Store } from '../../../store';
import { Workout, WorkoutsService } from '../shared/services/workouts/workouts.service';

@Component({
    selector: 'health-workouts',
    templateUrl: './workouts.component.html',
    styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {
    private componentAlive: boolean = true;

    workouts$: Observable<Workout[]>;

    constructor(
        private store: Store,
        private workoutsService: WorkoutsService
    ) { }

    handleOnRemoveWorkout(event: any) {
        this.workoutsService.removeWorkout(event.$key);
    }

    ngOnInit() {
        this.workouts$ = this.store.select<Workout[]>('workouts');
        this.workoutsService.workouts$
            .takeWhile(() => this.componentAlive)
            .subscribe();
    }

    ngOnDestroy() {
        this.componentAlive = false;
    }
}
