import { Component, OnInit } from '@angular/core';

import { Meal, MealsService } from '../../shared/services/meals/meals.service';
import { Router } from '@angular/router';

@Component({
    selector: 'health-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
    constructor(
        private router: Router,
        private mealsService: MealsService
    ) { }

    private backToMeals() {
        this.router.navigate(['meals']);
    }

    async addMeal(event: Meal) {
        await this.mealsService.addMeal(event);
        this.backToMeals();
    }

    ngOnInit() {
    }
}
