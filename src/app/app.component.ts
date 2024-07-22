import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    MatButtonModule,
  ],
  template: `
    <h1>Michael's Lab/Devtools</h1>
    <h2>Base 64 Encode</h2>

    <div id="base-64">
      <div class="base-64-type">
        <mat-form-field>
          <mat-label>Encode to Base 64</mat-label>
          <input
            matInput
            [ngModel]="$preEncode()"
            (ngModelChange)="$preEncode.set($event)"
          />
        </mat-form-field>
        <p>Encoded</p>
        <p>{{ $base64Encoded() }}</p>
        <button mat-flat-button [cdkCopyToClipboard]="$base64Encoded()">
          Copy to clipboard
        </button>
      </div>

      <div class="base-64-type">
        <mat-form-field>
          <mat-label>Decode from Base 64</mat-label>
          <input
            matInput
            [ngModel]="$postEncode()"
            (ngModelChange)="$postEncode.set($event)"
          />
        </mat-form-field>
        <p>Decoded</p>
        <p>{{ $base64Decoded() }}</p>
        <button mat-flat-button [cdkCopyToClipboard]="$base64Decoded()">
          Copy to clipboard
        </button>
      </div>
    </div>
  `,
  styles: `
      #base-64 {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        height: 100%;
      }
      .base-64-type {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        width: 50%;
      }
      p {
        text-wrap: wrap;
        word-break:break-all;
      }
  `,
})
export class AppComponent {
  title = 'michaels-small-lab-and-utils';
  $preEncode = signal<string | undefined>(undefined);
  $base64Encoded = computed(() => btoa(this.$preEncode() ?? ''));

  $postEncode = signal<string | undefined>(undefined);
  $base64Decoded = computed(() => atob(this.$postEncode() ?? ''));
}
