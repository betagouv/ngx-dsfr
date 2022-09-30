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
 * is to serve as a wrapper around an instance of DsfrRadioComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrRadioHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-radio';

  private getRadioInputElements: AsyncFactoryFn<TestElement[]> = this.locatorForAll('input[type=radio]');

  private async getRadioInputsAttributes (name: string): Promise<(string | null)[]> {
    const inputs: TestElement[] = await this.getRadioInputElements();

    const attributes = [];

    for (const input of inputs) {
      const attribute = await input.getAttribute(name);
      attributes.push(attribute);
    }

    return attributes;
  }

  /**
   * Retrieves the number of radio input tags in the DsfrRadioComponent's Template
   *
   * @returns A Promise that resolves to the number of radio input tags
   */
  async getInputsLength (): Promise<number> {
    const inputs: TestElement[] = await this.getRadioInputElements();

    return inputs?.length || 0;
  }

  /**
   * Retrieves the id values of the radio input tags
   * in the DsfrRadioComponent's Template
   *
   * @returns A Promise that resolves to the id values as a strings or null
   */
  async getRadioInputsIds (): Promise<(string | null)[]> {
    return this.getRadioInputsAttributes('id');
  }

  /**
   * Retrieves the values of the radio input tags
   * in the DsfrRadioComponent's Template
   *
   * @returns A Promise that resolves to the values as a strings or null
   */
  async getRadioInputsValues (): Promise<(string | null)[]> {
    return this.getRadioInputsAttributes('ng-reflect-value');
  }

  /**
   * Retrieves the name values of the radio input tags
   * in the DsfrRadioComponent's Template
   *
   * @returns A Promise that resolves to the name values as a strings or null
   */
  async getRadioInputsNames (): Promise<(string | null)[]> {
    return this.getRadioInputsAttributes('ng-reflect-name');
  }
}
