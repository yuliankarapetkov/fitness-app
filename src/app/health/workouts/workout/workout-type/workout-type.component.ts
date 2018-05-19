import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkoutTypeComponent),
    multi: true
};

@Component({
    selector: 'health-workout-type',
    providers: [TYPE_CONTROL_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './workout-type.component.html',
    styleUrls: ['./workout-type.component.scss']
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {
    private onTouch: Function;
    private onModelChange: Function;

    selectors = [ 'strength', 'endurance' ];
    value: string;

    constructor() { }

    registerOnChange(fn: Function) {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.onTouch = fn;
    }

    writeValue(value: string) {
        this.value = value;
    }

    setSelected(value: string) {
        this.value = value;
        this.onModelChange(value);
        this.onTouch();
    }

    ngOnInit() {
    }
}
