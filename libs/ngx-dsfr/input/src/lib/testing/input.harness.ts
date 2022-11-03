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
 * is to serve as a wrapper around an instance of DsfrInputComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrInputHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-input';

  private getInputElement: AsyncFactoryFn<TestElement> = this.locatorFor('input[type=text]');

  private async getInputAttribute(name: string): Promise<(string | null)> {
    const input: TestElement = await this.getInputElement();
    const attribute = await input.getAttribute(name);

    return attribute;
  }

  /**
   * Retrieves the id value of the input tags
   * in the DsfrInputComponent's Template
   *
   * @returns A Promise that resolves to the id value as a strings or null
   */
  async getInputId(): Promise<(string | null)> {
    return this.getInputAttribute('id');
  }

  /**
   * Retrieves the values of the input tags
   * in the DsfrInputComponent's Template
   *
   * @returns A Promise that resolves to the values as a strings or null
   */
  async getInputValue(): Promise<(string | null)> {
    return this.getInputAttribute('value');
  }

  /**
   * Retrieves the placeholder value of the input tags
   * in the DsfrInputComponent's Template
   *
   * @returns A Promise that resolves to the name values as a strings or null
   */
  async getInputPlaceholderAttribute(): Promise<(string | null)> {
    return this.getInputAttribute('placeholder');
  }
}
