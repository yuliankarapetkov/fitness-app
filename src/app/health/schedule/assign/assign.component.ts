import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Workout } from '../../shared/services/workouts/workouts.service';
import { Meal } from '../../shared/services/meals/meals.service';

@Component({
    selector: 'health-schedule-assign',
    templateUrl: './assign.component.html',
    styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {
    @Input()
    section: any;

    @Input()
    list: Meal[] | Workout[];

    @Output()
    onUpdate: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onCancel: EventEmitter<any> = new EventEmitter<any>();

    private selected: string[] = [];

    constructor() {}

    toggleItem(name: string) {
        if (this.exists(name)) {
            this.selected = this.selected.filter(item => item !== name);
        } else {
            this.selected = [...this.selected, name];
        }
    }

    getRoute(name: string) {
        return [`../${name}/new`];
    }

    exists(name: string) {
        return !!~this.selected.indexOf(name);
    }

    updateAssign() {
        this.onUpdate.emit({
            [this.section.type]: this.selected
        });
    }

    cancelAssign() {
        this.onCancel.emit();
    }

    ngOnInit() {
        this.selected = [...this.section.assigned];
    }
}
