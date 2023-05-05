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
 * is to serve as a wrapper around an instance of DsfrToggleComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrToggleHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-toggle';

  private getToggleInputElement: AsyncFactoryFn<TestElement> = this.locatorFor('input');

  private async getToggleInputAttribute(name: string): Promise<(string | null)> {
    const input: TestElement = await this.getToggleInputElement();
    const attribute = await input.getAttribute(name);

    return attribute;
  }

  /**
   * Retrieves the id value of the input tag
   * in the DsfrToggleComponent's Template
   *
   * @returns A Promise that resolves to the id value as a strings or null
   */
  async getToggleId(): Promise<(string | null)> {
    return this.getToggleInputAttribute('id');
  }
}
