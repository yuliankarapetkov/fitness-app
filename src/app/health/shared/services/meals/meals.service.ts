import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/do';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from '../../../../../store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';


export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class MealsService {
    // meals$: Observable<Meal[]> = this.database.list(`meals/${this.uid}`)
    //     .valueChanges()
    //     .do(next => this.store.set('meals', next)) as Observable<Meal[]>;

    // Small changes to handle the latest version of Firebase
    meals$ = this.database.list(`meals/${this.uid}`)
        .snapshotChanges()
        .map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() })))
        .do(next => this.store.set('meals', next));

    constructor(
        private store: Store,
        private database: AngularFireDatabase,
        private authService: AuthService
    ) { }

    get uid() {
        return this.authService.user.uid;
    }

    getMeal(key: string) {
        if (!key) {
            return Observable.of({});
        }

        return this.store.select<Meal>('meals')
        // A quick tip to remove all falsy (false, null, undefined, 0, NaN or an empty string) items out of an array
        // Since Boolean constructor is also a function, it returns either true for ‘truthy’ argument
        // or false for ‘falsy’ argument.
            .filter(Boolean)
            .map(meals => meals.find((meal: Meal) => meal.$key === key));
    }

    addMeal(meal: Meal) {
        return this.database.list(`meals/${this.uid}`).push(meal);
    }

    updateMeal(key: string, meal: Meal) {
        return this.database.object(`meals/${this.uid}/${key}`).update(meal);
    }

    removeMeal(key: string) {
        return this.database.list(`meals/${this.uid}`).remove(key);
    }
}
