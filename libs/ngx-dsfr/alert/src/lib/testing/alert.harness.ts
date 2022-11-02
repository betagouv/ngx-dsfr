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

  private getAlertTitleTag: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('h3');
  private getAlertDescriptionTag: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('p');
  private getAlertDivTag: AsyncFactoryFn<TestElement> = this.locatorFor('div');

  /**
   * Retrieves the content of the title in the DsfrAlertComponent's Template if available
   *
   * @returns A Promise that resolves to the title of the alert or
   * undefined if no title is provided
   */
  async getAlertTitle (): Promise<string | undefined> {
    const alert: TestElement | null = await this.getAlertTitleTag();

    return alert?.text();
  }

  /**
   * Retrieves the content of the description in the DsfrAlertComponent's Template if available
   *
   * @returns A Promise that resolves to the description of the alert or
   * undefined if no description is provided
   */
  async getAlertDescription (): Promise<string | undefined> {
    const alert: TestElement | null = await this.getAlertDescriptionTag();
    return alert?.text();
  }

  /**
   * Retrieves the classes for the div tag in the DsfrAlertComponent's Template
   *
   * @returns A Promise that resolves to an array of strings or an
   * empty array in there are no classes
   */
  async getDivClasses (): Promise<string[]> {
    const alertDiv: TestElement = await this.getAlertDivTag();

    const classesString = await alertDiv.getAttribute('class');

    return classesString ? classesString.split(' ') : [];
  }
}
