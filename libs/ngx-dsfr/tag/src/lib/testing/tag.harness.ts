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

  private getTagPElement: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('p');
  private getTagAElement: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('a');
  private getTagButtonElement: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('button');

  /**
   * Retrieves the text inside the p tag in the DsfrTagComponent's Template
   *
   * @returns A Promise that resolves to the value of p tag's text or null
   */
  async getPTagText(): Promise<string | null> {
    const p: TestElement | null = await this.getTagPElement();
    if (p) {
      return await p.text();
    }
    return null;
  }

  /**
   * Retrieves the text inside the a tag in the DsfrTagComponent's Template
   *
   * @returns A Promise that resolves to the value of a tag's text or null
   */
  async getATagText(): Promise<string | null> {
    const a: TestElement | null = await this.getTagAElement();
    if (a) {
      return await a.text();
    }
    return null;
  }

  /**
   * Retrieves the text inside the button tag in the DsfrTagComponent's Template
   *
   * @returns A Promise that resolves to the value of button tag's text or null
   */
  async getButtonTagText(): Promise<string | null> {
    const button: TestElement | null = await this.getTagButtonElement();
    if (button) {
      return await button.text();
    }
    return null;
  }

  /**
   * Retrieves an attribute of the p tag in the DsfrTagComponent's Template
   *
   * @returns A Promise that resolves to the value of p tag's attribute or null
   */
  async getTagPAttribute(name: string): Promise<string | null> {
    const p: TestElement | null = await this.getTagPElement();
    if (p) {
      return await p.getAttribute(name);
    }
    return null;
  }

  /**
   * Retrieves an attribute of the a tag in the DsfrTagComponent's Template
   *
   * @returns A Promise that resolves to the value of a tag's attribute or null
   */
  async getTagAAttribute(name: string): Promise<string | null> {
    const a: TestElement | null = await this.getTagAElement();
    if (a) {
      return await a.getAttribute(name);
    }
    return null;
  }

  /**
   * Retrieves an attribute of the button tag in the DsfrTagComponent's Template
   *
   * @returns A Promise that resolves to the value of button tag's attribute or null
   */
  async getTagButtonAttribute(name: string): Promise<string | null> {
    const button: TestElement | null = await this.getTagButtonElement();
    if (button) {
      return await button.getAttribute(name);
    }
    return null;
  }
}
