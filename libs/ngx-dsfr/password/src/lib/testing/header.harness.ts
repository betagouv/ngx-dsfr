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
 * is to serve as a wrapper around an instance of DsfrHeaderComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrPasswordHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-password';

  private getInstitutionElement: AsyncFactoryFn<TestElement> = this.locatorFor(
    '.fr-header__logo .fr-logo'
  );

  getInstitutionElementBrs: AsyncFactoryFn<TestElement[]> = this.locatorForAll(
    '.fr-header__logo .fr-logo br'
  );
  getInstitutionAnchorElement: AsyncFactoryFn<TestElement | null> =
    this.locatorForOptional('.fr-header__logo > a');

  getOperatorElement: AsyncFactoryFn<TestElement | null> =
    this.locatorForOptional('.fr-header__operator img');
  getOperatorAnchorElement: AsyncFactoryFn<TestElement | null> =
    this.locatorForOptional('.fr-header__operator > a');

  getAppNameElement: AsyncFactoryFn<TestElement | null> =
    this.locatorForOptional('.fr-header__service > a');

  getHeaderActions: AsyncFactoryFn<TestElement[]> = this.locatorForAll(
    '.fr-header__actions > li'
  );

  /**
   * Retrieves the institution actually displayed
   * in the DsfrHeaderComponent's Template
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
   * in the DsfrHeaderComponent's Template
   *
   * @returns A Promise that resolves to the title as a string
   */
  async getLinkTitle(): Promise<string | null> {
    const institutionAnchorElement: TestElement | null =
      await this.getInstitutionAnchorElement();
    if (institutionAnchorElement) {
      return await institutionAnchorElement.getAttribute('title');
    }

    const operatorAnchorElement: TestElement | null =
      await this.getOperatorAnchorElement();
    if (operatorAnchorElement) {
      return await operatorAnchorElement.getAttribute('title');
    }

    const appNameElement: TestElement | null = await this.getAppNameElement();
    if (appNameElement) {
      return await appNameElement.getAttribute('title');
    }

    return null;
  }
}
