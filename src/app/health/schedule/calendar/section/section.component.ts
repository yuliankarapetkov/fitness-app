import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ScheduleItem } from '../../../shared/services/schedule/schedule.service';

@Component({
    selector: 'health-schedule-section',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
    @Input() name: string;

    @Input() section: ScheduleItem;

    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    select(type: string, assigned: string[] = []) {
        const data= this.section;
        this.onSelect.emit({ type, assigned, data });
    }

    ngOnInit() {
    }
}
