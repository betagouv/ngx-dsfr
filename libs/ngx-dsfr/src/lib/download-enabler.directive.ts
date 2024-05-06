/**
 * Angular imports
 */
import { Directive, Input } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export interface DownloadOptions {
  open?: boolean;
  openOnAnotherPage?: boolean;
  fileName?: string;
  fileLang?: string;
  fileDesc?: string;
  fileType: string;
  fileWeight: string;
}

export const EMPTY_WEIGHT_OR_TYPE_ERROR: string =
  'The download object MUST have at least a value for fileType AND fileWeight 😡 !!!';

@Directive()
export class DownloadEnablerDirective {
  @Input() download?: DownloadOptions;

  protected setDownloadOptions(): void {
    if (this.download) {
      if (!this.download.fileType || !this.download.fileWeight) {
        throw EMPTY_WEIGHT_OR_TYPE_ERROR;
      }

      this.download = {
        open: false,
        openOnAnotherPage: true,
        fileName: '',
        fileLang: 'fr',
        ...this.download
      };
    }
  }
}