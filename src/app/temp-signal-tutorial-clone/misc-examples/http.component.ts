import { Component, computed } from '@angular/core';
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {UsersService} from "./users.service";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-http-and-signals',
  standalone: true,
  template: `
    <p><code>toSignal(this.someObservable$)</code> to access and then compute things from a signal</p>
    <p>Note how it is easier to use in the template</p>
    <pre>valueFromDatabase$ {{ valueFromDatabase$ | async | json }}</pre>
    <pre>$valueFromDatabase {{ $valueFromDatabase() | json }}</pre>

    <p>And compare how these values are derived in the component</p>
    <pre>derivedFromDatabase$ {{ derivedFromDatabase$ | async | json }}</pre>
    <pre>$derivedFromDatabase {{ $derivedFromDatabase() | json }}</pre>
  `,
  imports: [
    AsyncPipe,
    JsonPipe
  ]
})

export class HttpAndSignalsComponent {
  constructor(private usersService: UsersService) {}


  // Pretend this is a call to some service
  valueFromDatabase$ = this.usersService.getUsersNames()
  // Note - initialValue is optional, w/o it, it is typed including `| undefined`
  $valueFromDatabase = toSignal(this.valueFromDatabase$, {initialValue: []})

  // Need to know to pipe the observable and then use an RXJS map
  derivedFromDatabase$ = this.valueFromDatabase$.pipe(
    map((value) => value.map(v => v.name.toUpperCase()))
  )
  // Need to know to use a `computed`, then otherwise use a normal JS pipe
  // The simplicity is even better once you need more things like conditionals and dont't need an RXJS `filter` or whatnot
  $derivedFromDatabase = computed(() => this.$valueFromDatabase().map(value => value.name.toUpperCase()))
}
