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
 * is to serve as a wrapper around an instance of DsfrStepperComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrStepperHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-stepper';

  private getStepperTitleElement: AsyncFactoryFn<TestElement> = this.locatorFor('h2.fr-stepper__title');
  private getStepperStepsElement: AsyncFactoryFn<TestElement> = this.locatorFor('div.fr-stepper__steps');

  /**
   * Retrieves the value for the requested attribute of the steps element
   * in the DsfrStepperComponent's Template
   *
   * @returns A Promise that resolves to the value as a string or null
   * if the requested attribute is not found
   */
  async getStepperStepsAttribute (name: string): Promise<string | null> {
    const stepper: TestElement = await this.getStepperStepsElement();

    return stepper.getAttribute(name);
  }

  /**
   * Retrieves the full title in the
   * DsfrStepperComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the element
   */
  async getStepperFullTitle (): Promise<string> {
    const stepper: TestElement = await this.getStepperTitleElement();

    return stepper.text();
  }
}
