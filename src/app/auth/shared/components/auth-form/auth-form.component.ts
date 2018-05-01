import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'auth-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
    @Output() onSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    form = this.formBuilder.group({
        email: ['', Validators.email],
        password: ['', Validators.required]
    });

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
    }

    onSubmit() {
        if (this.form.valid) {
            this.onSubmitted.emit(this.form);
        }
    }

    get passwordInvalid() {
        const control = this.form.get('password');
        return control.hasError('required') && control.touched;
    }

    get emailFormat() {
        const control = this.form.get('email');
        return control.hasError('email') && control.touched;
    }
}
