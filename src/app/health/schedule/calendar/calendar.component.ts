import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'health-schedule-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
    @Input() set date(date: Date) {
        this.selectedDay = new Date(date.getTime());
    }

    @Output() onChange: EventEmitter<Date> = new EventEmitter<Date>();

    selectedDayIndex: number;
    selectedDay: Date;
    selectedWeek: Date;

    constructor() { }

    private getStartOfWeek(date: Date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    private getToday(date: Date) {
        let today = date.getDay() - 1;
        if (today < 0) {
            today = 6;
        }
        return today;
    }

    handleOnMove(offset: number) {
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());

        startDate.setDate(startDate.getDate() + (offset * 7));

        this.onChange.emit(startDate);
    }

    handleOnSelectDay(index: number) {
        const selectedDay = new Date(this.selectedWeek);
        selectedDay.setDate(selectedDay.getDate() + index);
        this.onChange.emit(selectedDay);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.selectedDayIndex = this.getToday(this.selectedDay);
        this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    }

    ngOnInit() {
    }
}
