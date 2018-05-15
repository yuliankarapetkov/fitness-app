import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Meal, MealsService } from '../../shared/services/meals/meals.service';

@Component({
    selector: 'health-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {
    private componentAlive: boolean = true;

    meal$: Observable<Meal>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private mealsService: MealsService
    ) { }

    private backToMeals() {
        this.router.navigate(['meals']);
    }

    async addMeal(event: Meal) {
        await this.mealsService.addMeal(event);
        this.backToMeals();
    }

    async updateMeal(event: Meal) {
        const key = this.route.snapshot.params.id;
        await this.mealsService.updateMeal(key, event);
        this.backToMeals();
    }

    async removeMeal(event: Meal) {
        const key = this.route.snapshot.params.id;
        await this.mealsService.removeMeal(key);
        this.backToMeals();
    }

    ngOnInit() {
        this.mealsService.meals$
            .takeWhile(() => this.componentAlive)
            .subscribe();

        this.meal$ = this.route.params
            .switchMap(param => this.mealsService.getMeal(param.id));
    }

    ngOnDestroy() {
        this.componentAlive = false;
    }
}
