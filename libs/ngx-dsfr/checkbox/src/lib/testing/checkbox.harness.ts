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
 * is to serve as a wrapper around an instance of DsfrCheckboxComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrCheckboxHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-checkbox';

  private getCheckboxInputElements: AsyncFactoryFn<TestElement[]> = this.locatorForAll('input[type=checkbox]');

  private async getCheckboxInputsAttributes(name: string): Promise<(string | null)[]> {
    const inputs: TestElement[] = await this.getCheckboxInputElements();

    const attributes = [];

    for (const input of inputs) {
      const attribute = await input.getAttribute(name);
      attributes.push(attribute);
    }

    return attributes;
  }

  /**
   * Retrieves the number of checkbox input tags in the DsfrCheckboxComponent's Template
   *
   * @returns A Promise that resolves to the number of checkbox input tags
   */
  async getInputsLength(): Promise<number> {
    const inputs: TestElement[] = await this.getCheckboxInputElements();

    return inputs?.length || 0;
  }

  /**
   * Retrieves the id values of the checkbox input tags
   * in the DsfrCheckboxComponent's Template
   *
   * @returns A Promise that resolves to an array of id values as strings or null
   */
  async getCheckboxInputsIds(): Promise<(string | null)[]> {
    return this.getCheckboxInputsAttributes('id');
  }

  /**
   * Retrieves the values of the checkbox input tags
   * in the DsfrCheckboxComponent's Template
   *
   * @returns A Promise that resolves to an array with the input values as strings or null
   */
  async getCheckboxInputsValues(): Promise<(string | null)[]> {
    return this.getCheckboxInputsAttributes('value');
  }

  /**
   * Retrieves the name values of the checkbox input tags
   * in the DsfrCheckboxComponent's Template
   *
   * @returns A Promise that resolves to an array of name values as strings or null
   */
  async getCheckboxInputsNames(): Promise<(string | null)[]> {
    return this.getCheckboxInputsAttributes('name');
  }
}
