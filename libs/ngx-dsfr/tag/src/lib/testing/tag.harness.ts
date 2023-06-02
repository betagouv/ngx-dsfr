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
 * is to serve as a wrapper around an instance of DsfrTagComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrTagHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-tag';

  private getTagPElement: AsyncFactoryFn<TestElement> = this.locatorFor('p');

  /**
   * Retrieves an attribute of the p tag in the DsfrTagComponent's Template
   *
   * @returns A Promise that resolves to the value of p tag's attribute
   */
  async getTagPAttribute(name: string): Promise<string | null> {
    const p: TestElement = await this.getTagPElement();

    return await p.getAttribute(name);
  }
}
