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
import { DsfrHeaderComponent } from '../header.component';
import { DsfrHeaderHarness } from './header.harness';
import { TestHostBasicComponent } from './test-host-basic.component';

describe('DsfrHeaderComponent', () => {
  let fixture: ComponentFixture<TestHostBasicComponent>;
  let testHost: TestHostBasicComponent;
  let componentUnderTest: DsfrHeaderComponent;
  let harnessLoader: HarnessLoader;
  let dsfrHeaderHarness: DsfrHeaderHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrHeaderComponent,
        TestHostBasicComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostBasicComponent);
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

  it('should be created', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should display the right template, with default values, when nothing is provided', async () => {
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
      'République  Française'
    );
    expect(await dsfrHeaderHarness.getInstitutionElementBrs()).toHaveLength(1);
    expect(
      await dsfrHeaderHarness.getInstitutionAnchorElement()
    ).not.toBeNull();
    expect(await dsfrHeaderHarness.getLinkTitle()).toBe(
      'Accueil - République Française'
    );
    expect(await dsfrHeaderHarness.getOperatorElement()).toBeNull();
    expect(await dsfrHeaderHarness.getOperatorAnchorElement()).toBeNull();
    expect(await dsfrHeaderHarness.getAppNameElement()).toBeNull();
    expect(await dsfrHeaderHarness.getHeaderActions()).toHaveLength(0);
  });
});
