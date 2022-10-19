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
 * is to serve as a wrapper around an instance of DsfrLinkComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrLinkHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-link';

  private getAnchorElement: AsyncFactoryFn<TestElement> = this.locatorFor('a');

  /**
   * Retrieves the value for the requested attribute of the anchor tag
   * in the DsfrLinkComponent's Template
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
   * in the DsfrLinkComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the anchor
   */
  async getAnchorText(): Promise<string> {
    const anchor: TestElement = await this.getAnchorElement();

    return anchor.text();
  }
}
