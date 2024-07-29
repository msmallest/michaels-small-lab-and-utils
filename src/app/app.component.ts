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
import { SignalExamplsComponent } from './temp-signal-tutorial-clone/signal-exampls.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {CodeStyledComponent} from "./code-styled.component";

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
    SignalExamplsComponent,
    MatButtonModule,
    MatExpansionModule,
    CodeStyledComponent,
  ],
  template: `
    <app-code-styled />
    <mat-accordion>
      <mat-expansion-panel
        (opened)="$showSignalExamples.set(true)"
        (closed)="$showSignalExamples.set(false)"
      >
      <mat-expansion-panel-header>
      <mat-panel-title> {{!$showSignalExamples() ? 'SHOW signal examples' : 'HIDE signal examples'}} </mat-panel-title>

    </mat-expansion-panel-header>
      <app-signal-examples />
      </mat-expansion-panel>
    </mat-accordion>

    <div id="app-component-root">
      <section>
        <h1>Michael's Lab/Devtools</h1>
        <a
          href="https://github.com/msmallest/michaels-small-lab-and-utils"
          target="_blank"
          >Repo</a
        >
      </section>

      Open the panel above for a detailed example of signals

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
  $showSignalExamples = signal(false);
}
