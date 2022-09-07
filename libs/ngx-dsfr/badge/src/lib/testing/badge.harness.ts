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
 * is to serve as a wrapper around an instance of DsfrBadgeComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrBadgeHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-badge';

  private getBadgeElement: AsyncFactoryFn<TestElement> = this.locatorFor('p');

  /**
   * Retrieves the value for the requested attribute of the element tag
   * in the DsfrBadgeComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getBadgeAttribute(name: string): Promise<string | null> {
    const badge: TestElement = await this.getBadgeElement();

    return badge.getAttribute(name);
  }

  /**
   * Retrieves the text content of the element tag
   * in the DsfrLinkComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the element
   */
  async getBadgeText(): Promise<string> {
    const badge: TestElement = await this.getBadgeElement();

    return badge.text();
  }
}
