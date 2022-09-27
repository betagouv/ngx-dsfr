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
 * is to serve as a wrapper around an instance of DsfrNavigationComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrNavigationHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-navigation';

  private getNavigationElement: AsyncFactoryFn<TestElement> = this.locatorFor('nav');
  private getAllItemsNavigation: AsyncFactoryFn<TestElement> = this.locatorFor('nav ul li button + div');

  /**
   * Retrieves the value for the requested attribute of the element tag
   * in the DsfrNavigationComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getNavigationAttribute(name: string): Promise<string | null> {
    const navigation: TestElement = await this.getNavigationElement();

    return navigation.getAttribute(name);
  }

  /**
   * Retrieves the text content of the element tag
   * in the DsfrNavigationComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the element
   */
  async getNavigationText(): Promise<string> {
    const navigation: TestElement = await this.getNavigationElement();

    return navigation.text();
  }

  /**
   * Retrieves the text content of the element tag
   * in the DsfrNavigationComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the element
   */
  async getFirstItemNavigation(): Promise<string | null> {
    const allItemsNavigation: TestElement = await this.getAllItemsNavigation();

    return allItemsNavigation.getAttribute('class');
  }
}
