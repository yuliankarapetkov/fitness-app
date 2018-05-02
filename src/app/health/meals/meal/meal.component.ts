import { Component, OnInit } from '@angular/core';

import { Meal } from '../../shared/services/meals/meals.service';

@Component({
    selector: 'health-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
    constructor() { }

    addMeal(event: Meal) {
        console.log(event);
    }

    ngOnInit() {
    }
}
