import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output,
    SimpleChanges
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'health-workout-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './workout-form.component.html',
    styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit, OnChanges {
    @Input() workout: Workout;

    @Output() onCreate: EventEmitter<Workout> = new EventEmitter<Workout>();
    @Output() onUpdate: EventEmitter<Workout> = new EventEmitter<Workout>();
    @Output() onRemove: EventEmitter<Workout> = new EventEmitter<Workout>();

    toggled: boolean = false;
    exists: boolean = false;

    form = this.formBuilder.group( {
        name: ['', Validators.required],
        type: 'strength',
        strength: this.formBuilder.group({
            reps: 0,
            sets: 0,
            weight: 0
        }),
        endurance: this.formBuilder.group({
            distance: 0,
            duration: 0
        })
    });

    constructor(
        private formBuilder: FormBuilder
    ) { }

    // get ingredients() {
    //     return this.form.get('ingredients') as FormArray;
    // }

    get required() {
        return this.form.get('name').hasError('required') && this.form.get('name').touched;
    }

    get workoutType() {
        return this.form.get('type') as FormControl;
    }

    get placeholder() {
        return `e.g. ${this.workoutType.value === 'strength' ? 'Benchpress' : 'Treadmill' }`;
    }

    createWorkout() {
        if (this.form.valid) {
            this.onCreate.emit(this.form.value);
        }
    }

    updateWorkout() {
        if (this.form.valid) {
            this.onUpdate.emit(this.form.value);
        }
    }

    removeWorkout() {
        this.onRemove.emit(this.form.value);
    }

    toggle() {
        this.toggled = !this.toggled;
    }

    ngOnChanges(change: SimpleChanges) {
        if (this.workout && this.workout.name) {
            this.exists = true;
            const value = this.workout;
            this.form.patchValue(value);
        }
    }

    ngOnInit() {
    }
}
