import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppHeaderComponent } from './app-header/app-header.component';
import { AppNavComponent } from './app-nav/app-nav.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        AppHeaderComponent,
        AppNavComponent
    ],
    exports: [
        AppHeaderComponent,
        AppNavComponent
    ]
})
export class SharedModule { }
