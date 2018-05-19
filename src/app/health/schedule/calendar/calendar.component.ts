import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ScheduleItem, ScheduleList } from '../../shared/services/schedule/schedule.service';

@Component({
    selector: 'health-schedule-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
    @Input() set date(date: Date) {
        this.selectedDay = new Date(date.getTime());
    }

    @Input() items: ScheduleList;

    @Output() onChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

    selectedDayIndex: number;
    selectedDay: Date;
    selectedWeek: Date;

    sections = [
        { key: 'morning', name: 'Morning' },
        { key: 'lunch', name: 'Lunch' },
        { key: 'evening', name: 'Evening' },
        { key: 'snacks', name: 'Snacks and Drinks   ' }
    ];

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

    getSection(name: string): ScheduleItem {
        return this.items && this.items[name] || {};
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

    handleOnSelectSection({ type, assigned, data}: any, section: string) {
        const day = this.selectedDay;
        this.onSelect.emit({
            type,
            assigned,
            section,
            day,
            data
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        this.selectedDayIndex = this.getToday(this.selectedDay);
        this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    }

    ngOnInit() {
    }
}
