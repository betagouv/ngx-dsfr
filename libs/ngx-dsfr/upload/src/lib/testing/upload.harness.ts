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

  private async getInputAttribute(name: string): Promise<(string | null)> {
    const input: TestElement = await this.getInputElement();
    const attribute = await input.getAttribute(name);

    return attribute;
  }

  /**
   * Retrieves the id value of the input tag
   * in the DsfrUploadComponent's Template
   *
   * @returns A Promise that resolves to the id value as a strings or null
   */
  async getInputId(): Promise<(string | null)> {
    return this.getInputAttribute('id');
  }
}
