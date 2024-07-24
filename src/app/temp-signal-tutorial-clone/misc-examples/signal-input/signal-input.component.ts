import {Component, computed, input} from '@angular/core';
import {HighlightJsDirective} from "ngx-highlight-js";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <pre highlight-js lang="typescript">$value = input.required&lt;string&gt;(); // {{ $value() }}</pre>
    <pre highlight-js lang="typescript">{{valueScreamingStr}} // {{ $valueScreaming() }}</pre>
  `,
  imports: [HighlightJsDirective]
})
export class Child {
  $value = input.required<string>();
  $valueScreaming = computed(() => `${this.$value().toUpperCase()}!`);
  valueScreamingStr = '$valueScreaming = computed(() => `${this.$value().toUpperCase()}!`);'
}

@Component({
  selector: 'app-signal-input',
  standalone: true,
  imports: [Child, FormsModule],
  template: `
    <div id="signal-input-example">
      <h2>Signal Input</h2>
      <div>
        <label for="val">Value passed to signal input</label>
        <input #val ngModel />
      </div>
      <br/>
      <app-child [$value]="val.value"/>
    </div>
  `,
  styles: `
    #signal-input-example {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  `
})
export class SignalInputComponent {

}
