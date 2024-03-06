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
 * is to serve as a wrapper around an instance of DsfrSelectComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrSelectHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-select';

  private getLabelElement: AsyncFactoryFn<TestElement> = this.locatorFor('label');
  private getSelectDivElement: AsyncFactoryFn<TestElement> = this.locatorFor('div.fr-select');

  /**
   * Retrieves value of the label in the DsfrSelectComponent's Template
   *
   * @returns A Promise that resolves to the string representing the text inside the label tag
   */
  async getLabelValue(): Promise<string> {
    const label: TestElement = await this.getLabelElement();

    return label.text();
  }

  /**
   * Retrieves the placeholder on the DsfrSelectComponent's Template
   *
   * @returns A Promise that resolves to the string representing the placeholder on the select
   */
  async getPlaceholder(): Promise<string> {
    const selectDiv: TestElement = await this.getSelectDivElement();

    return selectDiv.text();
  }

  /**
   * Simulates the click on the select div on the DsfrSelectComponent's Template
   *
   * @returns A Promise that resolves to void
   */
  async clickSelectDiv(): Promise<void> {
    const selectDiv: TestElement = await this.getSelectDivElement();

    await selectDiv.click();
  }
}
