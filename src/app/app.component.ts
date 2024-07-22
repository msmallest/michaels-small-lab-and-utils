import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, JsonPipe, MatFormFieldModule, MatInputModule],
  template: `
    <h1>Michael's Lab/Devtools</h1>
    <h2>Base 64 Encode</h2>

    <mat-form-field>
      <mat-label>Encode to Base 64</mat-label>
      <input matInput [ngModel]="$preEncode()" (ngModelChange)="$preEncode.set($event)">
    </mat-form-field>
    <p>Encoded</p>
    <p>{{$base64Encoded()}}</p>

    <hr />

    <mat-form-field>
      <mat-label>Decode from Base 64</mat-label>
      <input matInput [ngModel]="$postEncode()" (ngModelChange)="$postEncode.set($event)">
    </mat-form-field>
    <p>Decoded</p>
    <p>{{$base64Decoded()}}</p>

  `,
})
export class AppComponent {
  title = 'michaels-small-lab-and-utils';
  $preEncode = signal<string | undefined>(undefined)
  $base64Encoded = computed(() => btoa(this.$preEncode() ?? ''))

  $postEncode = signal<string | undefined>(undefined)
  $base64Decoded = computed(() => atob(this.$postEncode() ?? ''))
}
