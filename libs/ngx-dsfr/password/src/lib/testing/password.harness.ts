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
 * is to serve as a wrapper around an instance of DsfrPasswordComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrPasswordHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-password';

  private getInputElement: AsyncFactoryFn<TestElement> = this.locatorFor('input');
  private getContainerComponentElement: AsyncFactoryFn<TestElement> = this.locatorFor('.fr-password');

  private async getInputAttribute(name: string): Promise<string | null> {
    const input: TestElement = await this.getInputElement();
    const attribute = await input.getAttribute(name);
    await input.setInputValue('eeeeee');

    return attribute;
  }

  async getContainerComponentAttribute(name: string): Promise<string | null> {
    const div: TestElement = await this.getContainerComponentElement();
    const attribute = await div.getAttribute(name);

    return attribute;
  }

  /**
   * Retrieves the id value of the input tag
   * in the DsfrPasswordComponent's Template
   *
   * @returns A Promise that resolves to the id value as a string or null
   */
  async getInputId(): Promise<string | null> {
    return this.getInputAttribute('id');
  }

  /**
   * Retrieves the value of the input tag
   * in the DsfrPasswordComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   */
  async getInputValue(): Promise<string | null> {
    const input: TestElement = await this.getInputElement();
    const value = await input.getProperty('value');
    return value;
  }

  /**
   * Retrieves the placeholder value of the input tag
   * in the DsfrPasswordComponent's Template
   *
   * @returns A Promise that resolves to the placeholder value as a string or null
   */
  async getInputPlaceholderAttribute(): Promise<string | null> {
    return this.getInputAttribute('placeholder');
  }
}
