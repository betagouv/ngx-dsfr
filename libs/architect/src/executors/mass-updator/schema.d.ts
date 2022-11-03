/**
 * TypeScript entities and constants
 */
export interface MassUpdatorSchema {
  directories?: string | string[];
  glob: string;
  searchValues: string | string[];
  flags: string;
  replacements: string | string[];
  rewrite?: boolean;
  suffix?: string;
}
