import { Component } from '@angular/core';

@Component({
  selector: 'app-signal-apis',
  standalone: true,
  imports: [],
  template: `
    <h2>Signals in Other Angular APIs</h2>
    <p>
      Continuing the theme of the previous lesson, we are holding off on going
      over the basics so you can first see the full potential of signals. This
      time, in other parts of the Angular API that builds on signals.
    </p>
    <p>Some of the places in Angular's API with signals</p>
    <ul>
      <li>input</li>
      <li>
        Content Queries (viewChild, viewChildren, contentChild, contentChildren)
      </li>
      <li>Two way binding with model</li>
      <li>
        Interop functionality with RXJS (that is the next preview section)
      </li>
    </ul>
    <p>Future signals implementations</p>
    <ul>
      <li>Reactive Forms</li>
      <li>Router</li>
    </ul>
  `,
  styles: ``,
})
export class SignalApisComponent {}
