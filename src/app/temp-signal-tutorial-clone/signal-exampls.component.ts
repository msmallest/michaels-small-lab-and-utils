import { Component } from '@angular/core';
import { SignalsAboutComponent } from './01 - About/signals-about.component';
import { SignalApisComponent } from './01 - About/signal-apis.component';
import { MiscExamplesComponent } from './misc-examples/misc-examples.component';
import { FormEventsExampleComponent } from './form-events-example/form-events-example.component';

@Component({
  selector: 'app-signal-examples',
  standalone: true,
  imports: [
    SignalsAboutComponent,
    SignalApisComponent,
    MiscExamplesComponent,
    FormEventsExampleComponent,
  ],
  template: `
    <h1>Signals Tutorial</h1>
    <app-signals-about />
    <app-signal-apis />
    <app-misc-examples />
    <app-form-events-example />
  `,
  styles: ``,
})
export class SignalExamplsComponent {}
