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
 * is to serve as a wrapper around an instance of DsfrTabComponent
 * within Unit Tests
 *
 * To see more : https://material.angular.io/cdk/test-harnesses/overview
 */
export class DsfrTabHarness extends ComponentHarness {
  static hostSelector: string = 'dsfr-tab';

  private getTabs: AsyncFactoryFn<TestElement[]> = this.locatorForAll(
    '.fr-tabs__list button'
  );

  private getPanels: AsyncFactoryFn<TestElement[]> =
    this.locatorForAll('.fr-tabs__panel');

  getRoutedPanels: AsyncFactoryFn<TestElement[]> = this.locatorForAll(
    '.fr-tabs__panel router-outlet'
  );

  /**
   * Retrieves the text inside a Tab
   * in the DsfrTabComponent's Template
   *
   * @returns A Promise that resolves to the text of a Tab as a string or null
   */
  async getTabText(tabIndex: number): Promise<string | null> {
    return (await this.getTabs())[tabIndex]?.text();
  }

  /**
   * Retrieves the value for the class attribute of a Tab
   * in the DsfrTabComponent's Template
   *
   * @returns A Promise that resolves to the class attribute of a Tab as a string or null
   */
  async getTabClass(tabIndex: number): Promise<string | null> {
    return (await this.getTabs())[tabIndex]?.getAttribute('class');
  }

  /**
   * Retrieves the text inside a Panel
   * in the DsfrTabComponent's Template
   *
   * @returns A Promise that resolves to the text of a Panel as a string or null
   */
  async getPanelText(panelIndex: number): Promise<string | null> {
    return (await this.getPanels())[panelIndex]?.text();
  }
}
