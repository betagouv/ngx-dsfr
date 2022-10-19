import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

import { combineLatest, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DsfrFormFieldComponent } from '../form-field.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dsfr-hint',
  styleUrls: ['./hint.component.scss'],
  templateUrl: './hint.component.html',
})
export class DsfrHintComponent implements OnDestroy {

  @Input() helper: string | undefined;
  @Input() successMessage: string | undefined;

  control: NgControl | undefined;
  errorMessage: string | undefined;

  private readonly subscriptions = new Subscription();

  constructor(
    public readonly formFieldComponent: DsfrFormFieldComponent,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    const subscription = this.formFieldComponent.control$
      .pipe(
        tap((control) => this.control = control),
        switchMap((control) => combineLatest([control.statusChanges, this.formFieldComponent.touched$])),
      )
      .subscribe(() => {
        if (this.control) {
          if (!this.control.valid && this.control.errors) {
            console.log(this.control.errors)
            this.errorMessage = Object.values(this.control.errors)[0];
          } else {
            this.errorMessage = undefined;
          }
        }
        this.changeDetectorRef.detectChanges();
      });
    this.subscriptions.add(subscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
