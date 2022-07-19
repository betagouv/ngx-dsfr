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

  private getAnchorElement: AsyncFactoryFn<TestElement> = this.locatorFor('button');

  /**
   * Retrieves the value for the requested attribute of the anchor tag
   * in the DsfrButtonComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getAnchorAttribute(name: string): Promise<string | null> {
    const anchor: TestElement = await this.getAnchorElement();

    return anchor.getAttribute(name);
  }

  /**
   * Retrieves the text content of the anchor tag
   * in the DsfrButtonComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the anchor
   */
  async getAnchorText(): Promise<string> {
    const anchor: TestElement = await this.getAnchorElement();

    return anchor.text();
  }
}
