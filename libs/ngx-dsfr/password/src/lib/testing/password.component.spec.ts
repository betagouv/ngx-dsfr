/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

/**
 * 3rd-party imports
 */
import { RouterLinkDirectiveStub } from '@betagouv/ngx-dsfr/testing';

/**
 * Internal imports
 */
import { TestHostComponent } from './test-host.component';
import { DsfrHeaderComponent, EMPTY_ALT_ERROR } from '../password.component';
import { DsfrHeaderHarness } from './header.harness';

describe('DsfrHeaderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrHeaderComponent;
  let harnessLoader: HarnessLoader;
  let dsfrHeaderHarness: DsfrHeaderHarness;

  const testInstitution: string =
    "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation";
  const testOperatorLogoSrc: string = 'some/path/to/an/image';
  const testOperatorLogoAlt: string = 'the text in the image';
  const testAppName: string = 'My Test App';

  const checkTemplate: (
    matrix: [boolean, boolean, boolean, boolean, boolean]
  ) => void = async (matrix: [boolean, boolean, boolean, boolean, boolean]) => {
    expect(
      (await dsfrHeaderHarness.getInstitutionAnchorElement()) === null
    ).toBe(matrix[0]);
    expect((await dsfrHeaderHarness.getOperatorElement()) === null).toBe(
      matrix[1]
    );
    expect((await dsfrHeaderHarness.getOperatorAnchorElement()) === null).toBe(
      matrix[2]
    );
    expect((await dsfrHeaderHarness.getAppNameElement()) === null).toBe(
      matrix[3]
    );
    expect((await dsfrHeaderHarness.getHeaderActions()).length === 0).toBe(
      matrix[4]
    );
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrHeaderComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrHeaderComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrHeaderComponent LATER.
     *
     * We're NOT doing both HERE since getHarness() triggers
     * indirectly the Change Detection mechanism and thus,
     * Data Binding and ngOnInit()...
     */
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should display the institution properly when it is provided', async () => {
    testHost.testInstitution = testInstitution;

    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrHeaderHarness = await harnessLoader.getHarness<DsfrHeaderHarness>(
      DsfrHeaderHarness
    );

    expect(await dsfrHeaderHarness.getInstitution()).toBe(
      testInstitution.replaceAll('\n', '  ')
    );
    expect(await dsfrHeaderHarness.getInstitutionElementBrs()).toHaveLength(4);
    checkTemplate([false, true, true, true, true]);
  });

  it('should throw an error when operatorLogoSrc is provided and not operatorLogoAlt', () => {
    try {
      testHost.testInstitution = testInstitution;
      testHost.testOperatorLogoSrc = testOperatorLogoSrc;
      fixture.detectChanges();
      throw 'It should have thrown an error about "operatorLogoAlt"';
    } catch (error) {
      expect(error).toBe(EMPTY_ALT_ERROR);
    }
  });

  it("should display the operator's logo properly when operatorLogoSrc and operatorLogoAlt are provided", async () => {
    testHost.testInstitution = testInstitution;
    testHost.testOperatorLogoSrc = testOperatorLogoSrc;
    testHost.testOperatorLogoAlt = testOperatorLogoAlt;

    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrHeaderHarness = await harnessLoader.getHarness<DsfrHeaderHarness>(
      DsfrHeaderHarness
    );

    expect(await dsfrHeaderHarness.getLinkTitle()).toBe(
      'Accueil - ' +
      testOperatorLogoAlt +
      ' - ' +
      testInstitution.replaceAll('\n', ' ')
    );
    checkTemplate([true, false, false, true, true]);
  });

  it("should display the service's name properly when appName is provided and NOT operatorLogoSrc", async () => {
    testHost.testInstitution = testInstitution;
    testHost.testAppName = testAppName;

    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrHeaderHarness = await harnessLoader.getHarness<DsfrHeaderHarness>(
      DsfrHeaderHarness
    );

    expect(await dsfrHeaderHarness.getLinkTitle()).toBe(
      'Accueil - ' + testAppName + ' - ' + testInstitution.replaceAll('\n', ' ')
    );
    checkTemplate([true, true, true, false, true]);
  });

  it('should display the proper Template when appName AND operatorLogoSrc are provided', async () => {
    testHost.testInstitution = testInstitution;
    testHost.testOperatorLogoSrc = testOperatorLogoSrc;
    testHost.testOperatorLogoAlt = testOperatorLogoAlt;
    testHost.testAppName = testAppName;

    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrHeaderHarness = await harnessLoader.getHarness<DsfrHeaderHarness>(
      DsfrHeaderHarness
    );

    expect(await dsfrHeaderHarness.getLinkTitle()).toBe(
      'Accueil - ' +
      testAppName +
      ' - ' +
      testOperatorLogoAlt +
      ' - ' +
      testInstitution.replaceAll('\n', ' ')
    );
    checkTemplate([true, false, true, false, true]);
  });
});
