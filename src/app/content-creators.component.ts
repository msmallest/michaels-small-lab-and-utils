import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { mergeOptions } from './utils';

const defaultSocials = {youtube: ''}

@Component({
  selector: 'app-content-creators',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card class="example-card" appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ $name() }}</mat-card-title>
        <mat-card-subtitle>{{ $specialty() }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>
          {{ $description() }}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button (click)="openSocial('YouTube')">YouTube</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    .example-card {
      max-width: 400px;
    }
  `,
})
export class ContentCreatorsComponent {
  $description = input.required<string>({ alias: 'description' });
  $name = input.required<string>({ alias: 'name' });
  $specialty = input.required<string>({ alias: 'specialty' });

  $socials = input(defaultSocials, {transform: mergeOptions(defaultSocials), alias: 'socials'})

  openSocial(site: 'YouTube' | string) {
    if (site) {
      window.open(`https://youtube.com/${this.$socials().youtube}`)
    }
  }
}
