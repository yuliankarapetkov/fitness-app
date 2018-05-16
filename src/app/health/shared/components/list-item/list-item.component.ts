import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'health-list-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
    @Input() item: any;

    @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();

    toggled: boolean = false;

    constructor() { }

    getRoute(item: any) {
        return [
            `../${ item.ingredients ? 'meals' : 'workouts' }`,
            item.$key];
    }

    toggle() {
        this.toggled = !this.toggled;
    }

    removeItem() {
        this.onRemove.emit(this.item);
    }

    ngOnInit() {
    }
}
