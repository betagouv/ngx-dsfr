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
 * is to serve as a wrapper around an instance of DsfrTooltipComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrTooltipHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-tooltip';

  private getLinkElement: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('a.fr-link');
  private getButtonElement: AsyncFactoryFn<TestElement | null> = this.locatorForOptional('button.fr-btn--tooltip');
  private getTooltipElement: AsyncFactoryFn<TestElement> = this.locatorFor('span.fr-tooltip');

  /**
   * Retrieves the text content of the link (<a>) tag
   * in the DsfrTooltipComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the a
   */
  async getLinkElementText(): Promise<string | null> {
    const link: TestElement | null = await this.getLinkElement();

    return link ? link.text() : null;
  }

  /**
   * Retrieves the text content of the button tag
   * in the DsfrTooltipComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the button
   */
  async getButtonElementText(): Promise<string | null> {
    const button: TestElement | null = await this.getButtonElement();

    return button ? button.text() : null;
  }



  /**
   * Retrieves the text content of the tooltip span tag
   * in the DsfrTooltipComponent's Template
   *
   * @returns A Promise that resolves to the text between tags of the tooltip
   */
  async getTooltipElementText(): Promise<string | null> {
    const tooltip: TestElement | null = await this.getTooltipElement();

    return tooltip ? tooltip.text() : null;
  }
}
