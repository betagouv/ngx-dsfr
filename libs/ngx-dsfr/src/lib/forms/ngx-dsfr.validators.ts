import {
  AbstractControl,
  FormArray,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { isEmpty, isNil } from '../helpers';

const HTTP_URL_REGEX = '^http(s)?:\\/\\/?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export class CustomValidators extends Validators {

  static httpUrl({ value }: { value: string }): ValidationErrors | null {
    return RegExp(HTTP_URL_REGEX).test(value)
      ? null
      : { isNotValidUrl: true };
  }

  static multipleCheckboxRequireOne(fa: FormArray): ValidationErrors | null {
    return fa.value.includes(true) ? null : { multipleCheckboxRequireOne: true };
  }

  static shouldBeTrue(control: AbstractControl, errorMessage: string): ValidationErrors | null {
    return control.value !== true
      ? { shouldBeTrue: errorMessage }
      : null;
  }

  static stringRequired(control: AbstractControl, errorMessage: string): ValidationErrors | null {
    return !control.value || control.value === ''
      ? { required: errorMessage }
      : null;
  }
}
