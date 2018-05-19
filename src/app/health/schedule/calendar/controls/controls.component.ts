import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'health-schedule-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
    @Input() selected: Date;

    @Output() onMove: EventEmitter<number> = new EventEmitter<number>();

    offset = 0;

    constructor() { }

    moveDate(offset: number) {
        this.offset = offset;
        this.onMove.emit(offset);
    }

    ngOnInit() {
    }

}
