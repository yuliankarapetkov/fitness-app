import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'auth-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }

    registerUser(event: FormGroup) {
        console.log(event.value);
    }
}
