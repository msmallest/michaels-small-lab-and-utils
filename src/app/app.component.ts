import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Michael's Lab/Devtools</h1>
  `,
})
export class AppComponent {
  title = 'michaels-small-lab-and-utils';
}
