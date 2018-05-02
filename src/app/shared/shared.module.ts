import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppNavComponent } from './app-nav/app-nav.component';


@NgModule({
    declarations: [
        AppHeaderComponent,
        AppNavComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        AppHeaderComponent,
        AppNavComponent
    ]
})
export class SharedModule { }
