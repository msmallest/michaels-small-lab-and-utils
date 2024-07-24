import { Component, computed } from '@angular/core';
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {allEventsSignal} from "../../../form-events";
import {JsonPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-comparator-types',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, ReactiveFormsModule, JsonPipe, MatButton],
  template: `
    <div class="example">
      <h2>Reactive Forms</h2>
      <p>Hand rolled utility to sync up to reactive form value, status, pristine, and touched.</p>
      <form [formGroup]="form">
        <div id="form">
          <mat-form-field>
            <mat-label>Data Type</mat-label>
            <mat-select formControlName="dataType">
              @for (type of types; track $index) {
                <mat-option [value]="type" (click)="form.controls.comparator.setValue(''); form.controls.value.setValue('')">{{ type }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Options</mat-label>
            <mat-select formControlName="comparator">
              @for (opt of $options(); track $index) {
                <mat-option [value]="opt">{{ opt }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          @switch ($comparator()) {
            @case ($comparator() === 'Greater Than' || $comparator() === 'Less Than' ? $comparator() : undefined) {
              <input type="number" formControlName="value"/>
            }
            @case ($comparator() === 'Before' || $comparator() === 'Between' || $comparator() === 'After' ? $comparator() : undefined) {
              <input type="date" formControlName="value"/>
            }
            @case ($comparator() === 'Contains' || $comparator() === 'Equals (case sensitive)' || $comparator() === 'Equals (case insensitive)' ? $comparator() : undefined) {
              <input type="text" formControlName="value"/>
            }
            @default {
            }
          }
          <button mat-raised-button [disabled]="$formData().status === 'INVALID'">Submit</button>

          <pre>{{$formData() | json}}</pre>
        </div>
      </form>
    </div>
  `,
  styles: `
    .example {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
    #form {
      display: flex;
      gap: 10px;
      flex-direction: row;
      align-items: center;
    }
  `
})
export class ComparatorTypesComponent {
  types = ['number', 'date', 'varchar'] as const

  form = new FormGroup({
    dataType: new FormControl<'number' | 'date' | 'varchar' | undefined>(undefined),
    comparator: new FormControl<'Greater Than' | 'Less Than' | 'Before' | 'Between' | 'After' | 'Contains' | 'Equals (case sensitive)' | 'Equals (case insensitive)' | ''>(''),
    value: new FormControl<Date | string | number | undefined>(undefined, Validators.required)
  })

  $formData = allEventsSignal(this.form);
  $comparator = computed(() => this.$formData().value.comparator);

  $options = computed(() => {
    switch (this.$formData().value.dataType) {
      case 'number':
        return ['Greater Than', 'Less Than'] as const;
      case 'date':
        return ['Before', 'Between', 'After'] as const;
      case 'varchar':
        return ['Contains', 'Equals (case sensitive)', 'Equals (case insensitive)'] as const;
      default:
        return [''] as const
    }
  })

  ngOnInit() {
    console.log(this.form)
  }
}
