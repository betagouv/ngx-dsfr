/**
 * TypeScript entities and constants
 */
export interface MassUpdatorSchema {
  directory?: string;
  glob: string;
  searchValue: string;
  flags: string;
  replacement: string;
  rewrite?: boolean;
  suffix?: string;
}
