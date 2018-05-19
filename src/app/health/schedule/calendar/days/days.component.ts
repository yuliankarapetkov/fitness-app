import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'health-schedule-days',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './days.component.html',
    styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {
    @Input() selected: number;

    @Output() onSelectDay: EventEmitter<number> = new EventEmitter<number>();

    days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    constructor() { }

    selectDay(index: number) {
        this.onSelectDay.emit(index);
    }

    ngOnInit() {
    }
}
