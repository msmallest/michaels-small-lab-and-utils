import { JsonPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import {
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-signals-about',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    JsonPipe,
  ],
  template: `
    <h2>About Signals</h2>
    <p>
      Signals are one of the most powerful ways to manage component state in all
      of Angular. You can synchronously derive state from other state in an
      efficient way that is much easier to read than RXJS. Though they do not
      replace RXJS. In fact, they can be best friends.
    </p>
    <p>
      Signals landed in v16 in developer preview and as stable in v17. New
      signal APIs have followed with different status.
    </p>
    <p>
      What you see below and is explained in the following two paragraphs is
      typically done step by step.
    </p>
    <ul>
      <li>Initializing signals</li>
      <li>Updating signals</li>
      <li>Deriving other state automatically from those signals</li>
      <li>Do side effects based on the state</li>
    </ul>
    <p>
      But the magic of signals is in the last two pieces, deriving values and
      doing side effects. Because you can initialize and change data in many
      more ways than signals. The derived values and side effects, and how
      easily it can be done, is the real end goal of signals. So some basics of
      all of this is right here, and after a few examples like this it will go
      step by step from the start.
    </p>
    <p>
      In the following example, a form field for setting a name and a dropdown
      for setting a title both set signal values. There is also buttons to
      change the name, and each one changes the signal directly in one of two
      ways. And in between, you can see the value of not just either signal, but
      also a signal which is a value which is computed from either value.
    </p>
    <div id="form-and-signals">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="$name" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Title</mat-label>
        <mat-select [(ngModel)]="$title">
          <mat-option value="">None</mat-option>
          <mat-option value="the Great">the Great</mat-option>
        </mat-select>
      </mat-form-field>
      <div>
        <p>Signal values are accessed like methods, using <code>()</code>.</p>
        <pre>$name(): {{ $name() | json }}</pre>
        <pre>$title(): {{ $title() | json }}</pre>
        <pre>
$nameAndTitle(): {{
            $nameAndTitle() | json
          }} (computed from other two signals)</pre
        >
      </div>
      <button (click)="uppercaseName()">Name to uppercase (signal set)</button>
      <button (click)="lowercaseName()">
        Name to lowercase (signal update)
      </button>
    </div>
    <p>
      Check the console. A signal <code>effect</code> (ie for side effects of a
      signal value changing) logs anytime a signal value changes.
    </p>
  `,
  styles: `
    #form-and-signals {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
  `,
})
export class SignalsAboutComponent {
  // Lower case `signal` are given initial values, and can be set with:
  //
  // 1) ngModel ---> $name = signal(''); [(ngModel)]="$name" ngModel
  //    See the template and how it sets name and title
  //
  // 2) .set ---> $name = signal(''); $name.set('value here')
  //    See the button method `uppercaseName`. Best for primitives.
  //
  // 3) .update --> $count = signal(0); $count.update(value => value + 1)
  //    See the button method `lowercaseName`. Best for objects.
  $name = signal('');
  $title = signal('');

  // `computed` will
  $nameAndTitle = computed(() => this.$name() + ' ' + this.$title());

  // `.set` doing exactly what it sounds like
  uppercaseName() {
    this.$name.set(this.$name().toLowerCase());
  }

  // `.update` in this example is so simple it could just be `.set`, but it is
  //     more powerful and relevant for complex data like objects, where you may
  //     need to desctructure properties
  lowercaseName() {
    this.$name.update((name) => name.toUpperCase());
  }

  constructor() {
    // `effect` is one of the more complex uses of signals, but it is short for "side effect"
    // It is really good for console logging, as it will log whenever a signal value changes.
    // So if any one of these 3 signals change, they all change.
    effect(() =>
      console.log(
        '$name()',
        this.$name(),
        '\n$title()',
        this.$title(),
        '\nnameAndTitle()',
        this.$nameAndTitle()
      )
    );
  }
}
