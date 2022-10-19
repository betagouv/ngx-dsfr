/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

/**
 * 3rd-party imports
 */
import { RouterLinkDirectiveStub } from '@betagouv/ngx-dsfr/testing';
import { ElementAlignment } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import {
  DsfrInputComponent,
  EMPTY_LABEL_ERROR,
} from '../input.component';
import { TestHostComponent } from './test-host.component';
import { DsfrInputHarness } from './input.harness';


describe('DsfrLinkComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrInputComponent;
  let harnessLoader: HarnessLoader;
  let dsfrLinkHarness: DsfrInputHarness;

  const testLabel: string = 'Test Label';
  const testExternalLink: string = 'https://angular.io/guide/testing';
  const testInternalLink: string = '/another/route';
  const testTitle: string = 'Test Title';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrInputComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrInputComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrLinkComponent LATER.
     *
     * We're NOT doing both HERE since getHarness() triggers
     * indirectly the Change Detection mechanism and thus,
     * Data Binding and ngOnInit()...
     */
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

});
