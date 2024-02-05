/**
 * Angular imports
 */
import {
  AsyncFactoryFn,
  ComponentHarness,
  TestElement
} from '@angular/cdk/testing';

/**
 * This class inherits from ComponentHarness and its purpose
 * is to serve as a wrapper around the select overlay of the DsfrSelectComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrSelectOverlayHarness extends ComponentHarness {
  static hostSelector: string = 'div.cdk-overlay-container';

  private getOptionsDivElement: AsyncFactoryFn<TestElement[]> = this.locatorForAll('div.option-wrapper');
  private getSelectedDivElement: AsyncFactoryFn<TestElement[]> = this.locatorForAll('div.option-selected');

  /**
   * Retrieves all the options on the DsfrSelectComponent's Template
   *
   * @returns A Promise that resolves to an array of string representing all the labels of the options on the select
   */
  async getAllOptions(): Promise<string[]> {
    const optionDivs: TestElement[] = await this.getOptionsDivElement();

    const options: string[] = [];
    for (const optionDiv of optionDivs) {
      options.push(await optionDiv.text());
    }

    return options;
  }

  /**
   * Selects an option (based on the index param) on the DsfrSelectComponent's Template
   *
   * @returns A Promise that resolves to void
   */
  async selectAnOption(index: number): Promise<void> {
    const optionDivs: TestElement[] = await this.getOptionsDivElement();

    const optionDiv = optionDivs[index];
    if (!optionDiv) {
      throw new Error('There is no option on this index');
    }

    await optionDiv.click();
  }

  /**
   * Retrieves the selected values on the DsfrSelectComponent's Template
   *
   * @returns A Promise that resolves to an array of strings representing the selected values
   */
  async getSelectedValues(): Promise<string[]> {
    const selectedValuesDivs: TestElement[] = await this.getSelectedDivElement();

    const selectedValues: string[] = [];
    for (const selectedValuesDiv of selectedValuesDivs) {
      selectedValues.push(await selectedValuesDiv.text());
    }

    return selectedValues;
  }
}
