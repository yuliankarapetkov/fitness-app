import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'health-meal-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './meal-form.component.html',
    styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit {
    @Output() onCreate: EventEmitter<Meal> = new EventEmitter<Meal>();

    form = this.formBuilder.group( {
        name: ['', Validators.required],
        ingredients: this.formBuilder.array([''])
    });

    constructor(
        private formBuilder: FormBuilder
    ) { }

    get ingredients() {
        return this.form.get('ingredients') as FormArray;
    }

    get required() {
        return this.form.get('name').hasError('required') && this.form.get('name').touched;
    }

    addIngredient() {
        this.ingredients.push(new FormControl(''));
    }

    removeIngredient(index: number) {
        this.ingredients.removeAt(index);
    }

    createMeal() {
        if (this.form.valid) {
            this.onCreate.emit(this.form.value);
        }
    }

    ngOnInit() {
    }
}
