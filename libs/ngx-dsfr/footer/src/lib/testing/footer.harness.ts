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
 * is to serve as a wrapper around an instance of DsfrFooterComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrFooterHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-footer';

  private getInstitutionElement: AsyncFactoryFn<TestElement> = this.locatorFor('.fr-footer__brand .fr-logo');

  getInstitutionElementBrs: AsyncFactoryFn<TestElement[]> = this.locatorForAll('.fr-footer__brand .fr-logo br');
  getInstitutionAnchorElement: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('.fr-footer__brand > a');

  /**
   * Retrieves the institution actually displayed
   * in the DsfrFooterComponent's Template
   *
   * @returns A Promise that resolves to the institution as a string
   */
  async getInstitution(): Promise<string> {
    const element: TestElement = await this.getInstitutionElement();

    return element.text();
  }

  /**
   * Retrieves the title attribute's value for the <a> tag between
   * the institution, the operator and the service,
   * in the DsfrFooterComponent's Template
   *
   * @returns A Promise that resolves to the title as a string
   */
  async getLinkTitle(): Promise<string | null> {
    const institutionAnchorElement: TestElement | null =
      await this.getInstitutionAnchorElement();
    if (institutionAnchorElement) {
      return await institutionAnchorElement.getAttribute('title');
    }
    return null;
  }
}
