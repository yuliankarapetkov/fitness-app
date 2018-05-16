import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Workout, WorkoutsService } from '../../shared/services/workouts/workouts.service';

@Component({
    selector: 'health-workout',
    templateUrl: './workout.component.html',
    styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
    private componentAlive: boolean = true;

    workout$: Observable<Workout>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workoutsService: WorkoutsService
    ) { }

    private backToWorkouts() {
        this.router.navigate(['workouts']);
    }

    async addWorkout(event: Workout) {
        await this.workoutsService.addWorkout(event);
        this.backToWorkouts();
    }

    async updateWorkout(event: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutsService.updateWorkout(key, event);
        this.backToWorkouts();
    }

    async removeWorkout(event: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutsService.removeWorkout(key);
        this.backToWorkouts();
    }

    ngOnInit() {
        this.workoutsService.workouts$
            .takeWhile(() => this.componentAlive)
            .subscribe();

        this.workout$ = this.route.params
            .switchMap(param => this.workoutsService.getWorkout(param.id));
    }

    ngOnDestroy() {
        this.componentAlive = false;
    }
}
