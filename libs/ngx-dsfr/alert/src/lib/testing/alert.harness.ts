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
 * is to serve as a wrapper around an instance of DsfrAlertComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrAlertHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-alert';

  private getAlertTitleTag: AsyncFactoryFn<TestElement> = this.locatorFor('h3');
  private getAlertDescriptionTag: AsyncFactoryFn<TestElement> = this.locatorFor('p');

  /**
   * Retrieves the content of the title in the DsfrAlertComponent's Template
   *
   * @returns A Promise that resolves to the title of the alert
   */
  async getAlertTitle (): Promise<string> {
    const alert: TestElement = await this.getAlertTitleTag();

    return alert.text();
  }

  /**
   * Retrieves the content of the description in the DsfrAlertComponent's Template if available
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the description is not found
   */
  async getAlertDescription (): Promise<string | null> {
    let alert: TestElement;
    try {
      alert = await this.getAlertDescriptionTag();
      return alert.text();
    } catch (e) {
      return null;
    }
  }
}
