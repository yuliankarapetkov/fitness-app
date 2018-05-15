import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output,
    SimpleChange, SimpleChanges
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'health-meal-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './meal-form.component.html',
    styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit, OnChanges {
    @Input() meal: Meal;

    @Output() onCreate: EventEmitter<Meal> = new EventEmitter<Meal>();
    @Output() onUpdate: EventEmitter<Meal> = new EventEmitter<Meal>();
    @Output() onRemove: EventEmitter<Meal> = new EventEmitter<Meal>();

    toggled: boolean = false;
    exists: boolean = false;

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

    private emptyIngredients() {
        // Remove all ingredients
        while (this.ingredients.controls.length) {
            this.ingredients.removeAt(0);
        }
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

    updateMeal() {
        if (this.form.valid) {
            this.onUpdate.emit(this.form.value);
        }
    }

    removeMeal() {
        this.onRemove.emit(this.form.value);
    }

    toggle() {
        this.toggled = !this.toggled;
    }

    ngOnChanges(change: SimpleChanges) {
        if (this.meal && this.meal.name) {
            this.exists = true;
            this.emptyIngredients();

            const value = this.meal;
            this.form.patchValue(value);

            if (value.ingredients) {
                for (const item of value.ingredients) {
                    this.ingredients.push(new FormControl(item))
                }
            }
        }
    }

    ngOnInit() {
    }
}
