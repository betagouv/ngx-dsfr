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
 * is to serve as a wrapper around an instance of DsfrUploadComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrUploadHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-upload';

  private getInputElement: AsyncFactoryFn<TestElement> = this.locatorFor('input');
  private getInputGroupElement: AsyncFactoryFn<TestElement> = this.locatorFor('.fr-upload-group');

  private async getInputAttribute(name: string): Promise<(string | null)> {
    const input: TestElement = await this.getInputElement();

    return input.getAttribute(name);
  }

  /**
   * Retrieves the id value of the input tag
   * in the DsfrUploadComponent's Template
   *
   * @returns A Promise that resolves to the id value as a string or null
   */
  async getInputId(): Promise<(string | null)> {
    return this.getInputAttribute('id');
  }

  /**
   * Retrieves the class attribute value of the input group div
   * in the DsfrUploadComponent's Template
   *
   * @returns A Promise that resolves to the class value attribute as a string or null
   */
  async getInputClass(): Promise<(string | null)> {
    const inputGroup: TestElement = await this.getInputGroupElement();

    return inputGroup.getAttribute('class');
  }

  /**
   * Retrieves the aria-describedby attribute value of the input tag
   * in the DsfrUploadComponent's Template
   *
   * @returns A Promise that resolves to the aria-describedby value attribute as a string or null
   */
  async getInputAriaDescribedBy(): Promise<(string | null)> {
    return this.getInputAttribute('aria-describedby');
  }
}
