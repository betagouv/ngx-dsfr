/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlStatus,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';

/**
 * Internal imports
 */


/**
 * TypeScript entities and constants
 */


@Component({
  templateUrl: './upload-module.component.html',
  styleUrls: ['./upload-module.component.scss']
})
export class UploadModuleComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
