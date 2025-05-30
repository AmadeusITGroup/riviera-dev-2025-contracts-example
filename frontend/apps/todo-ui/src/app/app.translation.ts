import type {Translation} from '@o3r/core';

export interface AppTranslation extends Translation {
  /** Label for the add new item button */
  addNewItem: string;
  /** Page title */
  pageTitle: string;
}

export const translations: Readonly<AppTranslation> = {
  addNewItem: 'app-root.addNewItem',
  pageTitle: 'app-root.pageTitle'
} as const;
