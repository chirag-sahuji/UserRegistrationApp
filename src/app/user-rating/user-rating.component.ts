import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RatingComponent),
    },
    {
      provide: MatFormFieldControl,
      useExisting: RatingComponent
    }
  ],
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  @Input() disabled = false;
  @Input() value = 0;
  hoveredRating = 2;
  isMouseOver = false;

  onChange = (_: any) => { };
  onTouch = (_: any) => { };

  registerOnChange(angularProvidedFunction: (_: any) => void) {
    this.onChange = angularProvidedFunction;
  }

  registerOnTouched(angularProvidedFunction: (_: any) => void) {
    this.onTouch = angularProvidedFunction;
  }

  writeValue(angularProvidedValue: number) {
    this.value = angularProvidedValue;
  }

  setDisabledState(angularProvidedDisabledVal: boolean) {
    this.disabled = angularProvidedDisabledVal;
  }

  onRatingMouseEnter(rating: number) {
    if (this.disabled) return;
    this.hoveredRating = rating;
    this.isMouseOver = true;
  }
  onRatingMouseLeave() {
    if (this.disabled) return;
    this.hoveredRating = 0;
    this.isMouseOver = false;
  }
  selectRating(rating: number) {
    if (this.disabled) return;
    this.value = rating;
    this.onChange(this.value);
  }
  constructor() { }

  ngOnInit() { }
}

