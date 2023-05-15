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
   * Retrieves the test for the h1 tag
   * in the DsfrErrorPageComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if nothing is provided
   */
  async getTitleText(): Promise<string | null> {
    const element: TestElement = await this.getTitleElement();

    return element.text();
  }


  /**
   * Retrieves the value for the requested href of the a tag (home link)
   * in the DsfrErrorPageComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getHomeLinkHrefAttribute(): Promise<string | null> {
    const element: TestElement = await this.getHomeLinkElement();

    return element.getAttribute('href');
  }

   /**
   * Retrieves the value for the requested href of the a tag (contact us link)
   * in the DsfrErrorPageComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
   async getContactUsLinkHrefAttribute(): Promise<string | null> {
    const element: TestElement = await this.getContactUsLinkElement();

    return element.getAttribute('href');
  }

}
