import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-base-64',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    MatButtonModule,
  ],
  template: `
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
        <button mat-flat-button [cdkCopyToClipboard]="$base64Encoded()">
          Copy to clipboard
        </button>
        <p>{{ $base64Encoded() }}</p>
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
        <button mat-flat-button [cdkCopyToClipboard]="$base64Decoded()">
          Copy to clipboard
        </button>
        <p>{{ $base64Decoded() }}</p>
      </div>
    </div>
  `,
  styles: `
      #base-64 {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        max-height: 100%;
        gap: 10px;
      }
      .base-64-type {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        width: 50%;
        gap: 8px;
      }
      p {
        text-wrap: wrap;
        word-break:break-all;
      }
  `,
})
export class Base64Component {
  $preEncode = signal<string | undefined>(undefined);
  $base64Encoded = computed(() => btoa(this.$preEncode() ?? ''));

  $postEncode = signal<string | undefined>(undefined);
  $base64Decoded = computed(() => atob(this.$postEncode() ?? ''));
}
