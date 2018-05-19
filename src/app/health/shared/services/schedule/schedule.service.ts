import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from '../../../../../store';
import { Workout } from '../workouts/workouts.service';
import { Meal } from '../meals/meals.service';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Subject } from 'rxjs/Subject';


export interface ScheduleItem {
    meals: Meal[],
    workouts: Workout[],
    section: string,
    timestamp: number,
    $key?: string
}

export interface ScheduleList {
    morning?: ScheduleItem,
    lunch?: ScheduleItem,
    evening?: ScheduleItem,
    snacks?: ScheduleItem,
    [key: string]: any
}

@Injectable()
export class ScheduleService {
    private date$: BehaviorSubject<Date> = new BehaviorSubject(new Date());
    private section$: Subject<any> = new Subject<any>();
    private itemList$: Subject<any> = new Subject<any>();

    items$ = this.itemList$
        .withLatestFrom(this.section$)
        .map(([ items, section ]: any[]) => {
            const id = section.data.$key;

            console.log('section', section.data);

            const defaults: ScheduleItem = {
                workouts: null,
                meals: null,
                section: section.section,
                timestamp: new Date(section.day).getTime()
            };

            const payload = {
                ...(id ? section.data : defaults),
                ...items
            };

            if (id) {
                return this.updateSection(id, payload);
            } else {
                return this.createSection(payload);
            }
        });

    selected$ = this.section$
        .do((next: any) => this.store.set('selected', next));

    list$ = this.section$
        .map((value: any) => this.store.value[value.type])
        .do((next: any) => this.store.set('list', next));

    schedule$: Observable<ScheduleItem[]> = this.date$
        .do((next: any) => this.store.set('date', next))
        .map((day: any) => {
            const startAt = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
            const endAt = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime() - 1;

            return { startAt, endAt };
        })
        .switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt))
        .map((data: any) => {
            const mapped: ScheduleList = {};

            for (const prop of data) {
                if (!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
            }

            return mapped;
        })
        .do((next: any) => this.store.set('schedule', next));

    constructor(
        private store: Store,
        private authService: AuthService,
        private database: AngularFireDatabase
    ) { }

    get uid() {
        return this.authService.user.uid;
    }

    private getSchedule(startAt: number, endAt: number) {
        // return this.database.list(`schedule/${this.uid}`, {
        //     query: {
        //         orderByChild: 'timestamp',
        //         startAt,
        //         endAt
        //     }
        // });

        return this.database.list(`schedule/${this.uid}`,
            ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt))
            // Needs these changes because of the latest versions of Firebase and Angular Fire 2
            .snapshotChanges()
            .map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() })));
    }

    private createSection(payload: any) {
        return this.database.list(`schedule/${this.uid}`).push(payload);
    }

    private updateSection(key: string, payload: any) {
        delete payload.$key;
        return this.database.object(`schedule/${this.uid}/${key}`).update(payload);
    }

    updateDate(date: Date) {
        this.date$.next(date);
    }

    selectSection(event: any) {
        this.section$.next(event);
    }

    updateItems(items: string[]) {
        this.itemList$.next(items);
    }
}
