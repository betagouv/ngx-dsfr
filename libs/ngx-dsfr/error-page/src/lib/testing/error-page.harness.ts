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
 * is to serve as a wrapper around an instance of DsfrErrorPageComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrErrorPageHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-error-page';

  private getHomeLinkElement: AsyncFactoryFn<TestElement> = this.locatorFor('.fr-btns-group li:first-child a');
  private getContactUsLinkElement: AsyncFactoryFn<TestElement> = this.locatorFor('.fr-btns-group li:last-child a');
  private getTitleElement: AsyncFactoryFn<TestElement> = this.locatorFor('h1');

  /**
   * Retrieves the text for the h1 tag
   * in the DsfrErrorPageComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if nothing is found
   */
  async getTitleText(): Promise<string | null> {
    const element: TestElement = await this.getTitleElement();

    return element.text();
  }


  /**
   * Retrieves the URL used by the a tag
   * in the DsfrErrorPageComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getHomeLinkHrefAttribute(): Promise<string | null> {
    const element: TestElement = await this.getHomeLinkElement();

    return element.getAttribute('ng-reflect-link-params');
  }

   /**
   * Retrieves the URL used by the a tag
   * in the DsfrErrorPageComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
   async getContactUsLinkHrefAttribute(): Promise<string | null> {
    const element: TestElement = await this.getContactUsLinkElement();

    return element.getAttribute('ng-reflect-link-params');
  }

}
