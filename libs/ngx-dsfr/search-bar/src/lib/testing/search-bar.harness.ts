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
 * is to serve as a wrapper around an instance of DsfrSearchBarComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrSearchBarHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-search-bar';

  private getInputElement: AsyncFactoryFn<TestElement> = this.locatorFor('input');

  private async getInputAttribute(name: string): Promise<(string | null)> {
    const input: TestElement = await this.getInputElement();
    const attribute = await input.getAttribute(name);

    return attribute;
  }

  /**
   * Retrieves the id value of the input tag
   * in the DsfrSearchBarComponent's Template
   *
   * @returns A Promise that resolves to the id value as a string or null
   */
  async getInputId(): Promise<(string | null)> {
    return this.getInputAttribute('id');
  }

  /**
   * Retrieves the value of the input tag
   * in the DsfrSearchBarComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   */
  async getInputValue(): Promise<(string | null)> {
    return this.getInputAttribute('value');
  }

  /**
   * Retrieves the placeholder value of the input tag
   * in the DsfrSearchBarComponent's Template
   *
   * @returns A Promise that resolves to the placeholder value as a string or null
   */
  async getInputPlaceholderAttribute(): Promise<(string | null)> {
    return this.getInputAttribute('placeholder');
  }
}
