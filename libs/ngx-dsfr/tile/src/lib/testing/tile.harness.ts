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
 * is to serve as a wrapper around an instance of DsfrTileComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrTileHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-tile';

  private getLinkElement: AsyncFactoryFn<TestElement> = this.locatorFor('a');
  private getTileDescriptionElement: AsyncFactoryFn<TestElement> = this.locatorFor('.fr-tile__desc');
  private getTileImageElement: AsyncFactoryFn<TestElement> = this.locatorFor('.fr-tile__img img');

  /**
   * Retrieves the value for the requested attribute of the link (<a>) tag
   * in the DsfrTileComponent's Template
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
   * in the DsfrTileComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getImageAttribute(name: string): Promise<string | null> {
    const image: TestElement = await this.getTileImageElement();

    return image.getAttribute(name);
  }



  /**
   * Retrieves the text content of the description element tag
   * in the DsfrTileComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the description
   */
  async getDescriptionText(): Promise<string> {
    const description: TestElement = await this.getTileDescriptionElement();

    return description.text();
  }
}
