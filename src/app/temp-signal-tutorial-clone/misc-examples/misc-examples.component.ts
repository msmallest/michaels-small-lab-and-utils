import {Component, computed, signal} from '@angular/core';
import {AsyncPipe, JsonPipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {HighlightJsDirective} from "ngx-highlight-js";
import {SignalInputComponent} from "./signal-input/signal-input.component";
import {ComparatorTypesComponent} from "./comparator-types/comparator-types.component";
import { map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-misc-examples',
  standalone: true,
  imports: [JsonPipe, MatButtonModule, HighlightJsDirective, SignalInputComponent, ComparatorTypesComponent, AsyncPipe],
  template: `
    <div id="double-example">
      <h2>Setting Signal Values</h2>
      <div class="text">Updating a signal with
        <pre highlight-js lang="typescript">.set()</pre>
        and
        <pre highlight-js lang="typescript">.update()</pre>.
      </div>
      <div class="text">The doubled value is <pre highlight-js lang="typescript">computed()</pre> any time <pre highlight-js lang="typescript">$value</pre> changes.
      </div>
      <button mat-flat-button color="primary" (click)="value.set(value() + 1)">$value.set($value() + 1)</button>
      <button mat-flat-button color="primary" (click)="updateValue()">$value.update(v => v + 1)</button>
      <div class="code-bg">
        <pre highlight-js lang="typescript">$value = signal(0); // {{ value() }}</pre>
        <pre highlight-js
             lang="typescript">$doubleValue = computed(() => this.$value() * 2); // {{ $doubleValue() }}</pre>
      </div>
    </div>
    <app-signal-input />
    <app-comparator-types />
    <h2>WIP: interop TODO MOVE TO OWN HIGHLIGHTED COMPONENT</h2>
    <p><code>toSignal(this.someObservable$)</code> to access and then compute things from a signal</p>
    <p>Note how it is easier to use in the template</p>
    <pre>valueFromDatabase$ {{valueFromDatabase$ | async | json}}</pre>
    <pre>$valueFromDatabase {{$valueFromDatabase() | json }}</pre>

    <p>And compare how these values are derived in the component</p>
    <pre>derivedFromDatabase$ {{derivedFromDatabase$ | async | json}}</pre>
    <pre>$derivedFromDatabase {{$derivedFromDatabase() | json }}</pre>
  `,
  styles: `
    #double-example {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  `
})
export class MiscExamplesComponent {
  value = signal(0);

  $doubleValue = computed(() => this.value() * 2)

  updateValue() {
    this.value.update(v => v + 1)
  }

  // Pretend this is a call to some service
  valueFromDatabase$ = of([{name: 'Dave'}, {name: 'Jeff'}])
  // Note - initialValue is optional, w/o it it is typed including `| undefined`
  $valueFromDatabase = toSignal(this.valueFromDatabase$, {initialValue: []})

  // Need to know to pipe the observable and then use an RXJS map
  derivedFromDatabase$ = this.valueFromDatabase$.pipe(
    map((value) => value.map(v => v.name.toUpperCase()))
  )
  // Need to know to use a `computed`, then otherwise use a normal JS pipe
  // The simplicity is even better once you need more things like conditionals and dont't need an RXJS `filter` or whatnot
  $derivedFromDatabase = computed(() => this.$valueFromDatabase().map(value => value.name.toUpperCase()))
}
