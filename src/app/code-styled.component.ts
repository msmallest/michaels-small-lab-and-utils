import {
  Component,
  computed,
  input,
  Pipe,
  Signal,
  signal,
} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {HighlightJsDirective} from "ngx-highlight-js";

export type CodeReplacement = { symbol?: string; code: string; with: any };

@Pipe({
  name: 'replace',
  standalone: true,
})
export class ReplacePipe {
  transform(value: string, replacements: CodeReplacement) {
    let modifiedReplacement = structuredClone(replacements);
    switch (typeof modifiedReplacement.with) {
      case 'string':
        modifiedReplacement.with = `'${replacements.with}'`;
        break;
      case 'number':
        modifiedReplacement.with = replacements.with.toString();
        break;
      case 'bigint':
        modifiedReplacement.with = replacements.with.toString();
        break;
      case 'boolean':
        modifiedReplacement.with = replacements.with.toString();
        break;
      case 'symbol':
        modifiedReplacement.with = replacements.with.toString();
        break;
      case 'undefined':
        modifiedReplacement.with = 'undefined';
        break;
      case 'object':
        modifiedReplacement.with = JSON.stringify(replacements.with);
        break;
      case 'function':
        modifiedReplacement.with = replacements.with.toString();
        break;
    }
    return value.replaceAll(
      modifiedReplacement.symbol ?? '-+-',
      modifiedReplacement.with
    );
  }
}

@Component({
  selector: 'app-live-code',
  standalone: true,
  template: `
    <div class="code-block">
      <pre highlight-js lang="typescript">{{ $replacement().code | replace : $replacement() }}</pre>
    </div>
  `,
  imports: [ReplacePipe, JsonPipe, HighlightJsDirective],
  styles: `
    .code-block {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  `
})
export class LiveCodeComponent {
  public $replacement = input.required<CodeReplacement>({
    alias: 'replacement',
  });
}

@Component({
  selector: 'app-code-styled',
  standalone: true,
  template: `
    <button (click)="$number.set($number() + 1)">Increase Number</button>
    <div class="code-block">
      <app-live-code [replacement]="numberReplacement()"/>
      <app-live-code [replacement]="doubleNumberReplacement()"/>
    </div>

    <div class="code-block">
      <app-live-code [replacement]="stuffReplacement()"/>
      <app-live-code [replacement]="stuffCapsReplacement()"/>
    </div>
  `,
  imports: [ReplacePipe, JsonPipe, LiveCodeComponent],
})
export class CodeStyledComponent {
  $number = signal(3);
  numberReplacement: Signal<CodeReplacement> = computed(() => ({
    symbol: '-+-',
    code: '$number = signal(-+-) ; // -+-',
    with: this.$number(),
  }));

  $doubleNumber = computed(() => this.$number() * 2);
  doubleNumberReplacement: Signal<CodeReplacement> = computed(() => ({
    code: '$doubleNumber = computed(() => this.$number() * 2); // -+-',
    with: this.$doubleNumber(),
  }));

  $stuff = signal('whoa');
  stuffReplacement: Signal<CodeReplacement> = computed(() => ({
    code: "$stuff = signal('whoa'); // -+-",
    with: this.$stuff(),
  }));

  $stuffCaps = computed(() => {
    return this.$stuff().toUpperCase();
  });
  stuffCapsReplacement: Signal<CodeReplacement> = computed(() => ({
    code: `
$stuffCaps = computed(() => {
    return this.$stuff().toUpperCase(); // -+-
});
`,
    with: this.$stuffCaps(),
  }));

  constructor() {
    console.log(this.$stuffCaps.prototype);
  }
}

