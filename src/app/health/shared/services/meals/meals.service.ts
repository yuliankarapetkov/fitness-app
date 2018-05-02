import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
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
    meals$: Observable<Meal[]> = this.database.list(`meals/${this.uid}`)
        .valueChanges()
        .do(next => this.store.set('meals', next)) as Observable<Meal[]>;

    constructor(
        private store: Store,
        private database: AngularFireDatabase,
        private authService: AuthService
    ) { }

    get uid() {
        return this.authService.user.uid;
    }

    addMeal(meal: Meal) {
        return this.database.list(`meals/${this.uid}`).push(meal);
    }
}
