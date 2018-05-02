import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';

import { Meal, MealsService } from '../shared/services/meals/meals.service';
import { Store } from '../../../store';

@Component({
    selector: 'health-meals',
    templateUrl: './meals.component.html',
    styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {
    private componentAlive: boolean = true;

    meals$: Observable<Meal[]>;

    constructor(
        private store: Store,
        private mealsService: MealsService
    ) { }

    ngOnInit() {
        this.meals$ = this.store.select<Meal[]>('meals');
        this.mealsService.meals$
            .takeWhile(() => this.componentAlive)
            .subscribe();
    }

    ngOnDestroy() {
        this.componentAlive = false;
    }
}
