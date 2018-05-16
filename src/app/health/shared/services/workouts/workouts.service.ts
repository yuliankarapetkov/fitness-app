import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/do';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from '../../../../../store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';


export interface Workout {
    name: string,
    type: string;
    strength: any;
    endurance: any;
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class WorkoutsService {
    // Small changes to handle the latest version of Firebase
    workouts$ = this.database.list(`workouts/${this.uid}`)
        .snapshotChanges()
        .map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() })))
        .do(next => this.store.set('workouts', next));

    constructor(
        private store: Store,
        private database: AngularFireDatabase,
        private authService: AuthService
    ) { }

    get uid() {
        return this.authService.user.uid;
    }

    getWorkout(key: string) {
        if (!key) {
            return Observable.of({});
        }

        return this.store.select<Workout>('workouts')
        // A quick tip to remove all falsy (false, null, undefined, 0, NaN or an empty string) items out of an array
        // Since Boolean constructor is also a function, it returns either true for ‘truthy’ argument
        // or false for ‘falsy’ argument.
            .filter(Boolean)
            .map(workouts => workouts.find((workout: Workout) => workout.$key === key));
    }

    addWorkout(workout: Workout) {
        return this.database.list(`workouts/${this.uid}`).push(workout);
    }

    updateWorkout(key: string, workout: Workout) {
        return this.database.object(`workouts/${this.uid}/${key}`).update(workout);
    }

    removeWorkout(key: string) {
        return this.database.list(`workouts/${this.uid}`).remove(key);
    }
}
