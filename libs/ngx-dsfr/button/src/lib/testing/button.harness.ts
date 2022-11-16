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
 * is to serve as a wrapper around an instance of DsfrButtonComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrButtonHarness extends ComponentHarness {
  static hostSelector = 'dsfr-button';

  private getButtonElement: AsyncFactoryFn<TestElement> = this.locatorFor('button');

  /**
   * Retrieves the value for the requested attribute of the button tag
   * in the DsfrButtonComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getButtonAttribute(name: string): Promise<string | null> {
    const button: TestElement = await this.getButtonElement();

    return button.getAttribute(name);
  }

  /**
   * Retrieves the text content of the button tag
   * in the DsfrButtonComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the button
   */
  async getButtonText(): Promise<string> {
    const button: TestElement = await this.getButtonElement();

    return button.text();
  }
}
