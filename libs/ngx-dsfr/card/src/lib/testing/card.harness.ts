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
 * is to serve as a wrapper around an instance of DsfrCardComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrCardHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-card';

  private getLinkElement: AsyncFactoryFn<TestElement> = this.locatorFor('a');
  private getCardDescriptionElement: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('.fr-card__desc');
  private getCardImageElement: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('.fr-card__img img');

  /**
   * Retrieves the value for the requested attribute of the link (<a>) tag
   * in the DsfrCardComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getLinkElementAttribute(name: string): Promise<string | null> {
    const element: TestElement = await this.getLinkElement();

    return element.getAttribute(name);
  }

  /**
   * Retrieves the value for the requested attribute of the image tag
   * in the DsfrCardComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getImageAttribute(name: string): Promise<string | null> {
    const image: TestElement | null = await this.getCardImageElement();

    return image ? image.getAttribute(name) : null;
  }

  /**
   * Retrieves the text content of the description element tag
   * in the DsfrCardComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the description
   */
  async getDescriptionText(): Promise<string | null> {
    const description: TestElement | null = await this.getCardDescriptionElement();

    return description ? description.text() : null;
  }
}
