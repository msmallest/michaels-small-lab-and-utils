import {Component, inject} from '@angular/core';
import {FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {allEventsObservable, allEventsSignal} from "../../form-events";
import {HighlightJsDirective} from "ngx-highlight-js";

@Component({
  selector: 'app-form-events-example',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, AsyncPipe, HighlightJsDirective],
  template: `
    <input [formControl]="form" name="firstName" autocomplete="off" />
<!--    <pre>{{ form$ | async | json }}</pre>-->

    <br />
    <br />
    <pre highlight-js lang="typescript">
value: T; // {{$form().value | json}}
status: FormControlStatus; // {{$form().status | json}}
touched: boolean; // {{$form().touched | json}}
pristine: boolean; // {{$form().pristine | json}}
valid: boolean; // {{$form().valid | json}}
invalid: boolean; // {{$form().invalid | json}}
pending: boolean; // {{$form().pending | json}}
dirty: boolean; // {{$form().dirty | json}}
untouched: boolean; // {{$form().untouched | json}}
    </pre>
  `,
  styles: `
    input {
      width: 99%;
    }
  `
})
export class FormEventsExampleComponent {
  fb = inject(NonNullableFormBuilder);
  form = new FormControl('', Validators.required);

  form$ = allEventsObservable(this.form);
  $form = allEventsSignal(this.form);

  opening = 'type FormEventData<T> = {'
  closing = '}'
}
