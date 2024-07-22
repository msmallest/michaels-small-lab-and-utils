import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ContentCreatorsComponent } from './content-creators.component';
import { LinksComponent } from './links.component';
import { Base64Component } from './base-64.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    JsonPipe,
    ContentCreatorsComponent,
    LinksComponent,
    Base64Component,
  ],
  template: `
    <div id="app-component-root">
      <section>
        <h1>Michael's Lab/Devtools</h1>
        <a
          href="https://github.com/msmallest/michaels-small-lab-and-utils"
          target="_blank"
          >Repo</a
        >
      </section>
      <section>
        <h2>Helpful Links</h2>
        <app-links />
      </section>
      <section>
        <h2>Base 64 Encode</h2>
        <app-base-64 />
      </section>
      <section>
        <h2>Educators</h2>
        <app-content-creators
          name="Joshua Morony"
          specialty="rxjs + signals + signalSlice creator"
          description="YouTuber / ngxtension maintainer"
          [socials]="{ youtube: '@JoshuaMorony' }"
        />
      </section>
    </div>
  `,
  styles: `
    #app-component-root {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  `,
})
export class AppComponent {
  title = 'michaels-small-lab-and-utils';
}
