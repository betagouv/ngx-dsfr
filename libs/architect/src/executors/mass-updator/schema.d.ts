/**
 * TypeScript entities and constants
 */
export interface MassUpdatorSchema {
  directory?: string;
  glob: string;
  searchValues: string | string[];
  flags: string;
  replacements: string | string[];
  rewrite?: boolean;
  suffix?: string;
}
